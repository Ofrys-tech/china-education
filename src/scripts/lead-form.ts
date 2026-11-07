import { track } from "@/lib/analytics";
import { buildLeadPayload, endpointFor, type LeadProvider } from "@/lib/leads/payload";
import { type LeadValues, validateLead } from "@/lib/leads/schema";

const UTM_KEYS = ["source", "medium", "campaign", "content", "term"] as const;

type FormElement = HTMLFormElement & {
  elements: HTMLFormControlsCollection;
};

function rawValues(form: FormElement): Record<string, unknown> {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    contactMethod: String(data.get("contactMethod") ?? ""),
    contact: String(data.get("contact") ?? ""),
    degree: String(data.get("degree") ?? ""),
    direction: String(data.get("direction") ?? ""),
    intake: String(data.get("intake") ?? ""),
    message: String(data.get("message") ?? ""),
    consent: data.get("consent") === "true" || data.get("consent") === "on",
    website: String(data.get("website") ?? ""),
  };
}

function errorId(item: HTMLElement, key: string): string {
  if (!item.id) item.id = `lead-error-${key}-${Math.random().toString(36).slice(2, 7)}`;
  return item.id;
}

function clearErrors(form: FormElement): void {
  form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((item) => {
    item.hidden = true;
    item.textContent = "";
  });

  form.querySelectorAll<HTMLElement>("[aria-invalid]").forEach((input) => {
    input.removeAttribute("aria-invalid");
    const ids = (input.getAttribute("aria-describedby") ?? "")
      .split(/\s+/)
      .filter((id) => id && !id.startsWith("lead-error-"));
    if (ids.length) {
      input.setAttribute("aria-describedby", ids.join(" "));
    } else {
      input.removeAttribute("aria-describedby");
    }
  });
}

function showErrors(
  form: FormElement,
  errors: Partial<Record<string, string>>,
): HTMLElement | null {
  clearErrors(form);
  let firstInvalid: HTMLElement | null = null;

  for (const [key, message] of Object.entries(errors)) {
    if (!message) continue;
    const errorElement = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
    const input = form.querySelector<HTMLElement>(`[name="${key}"]`);

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.hidden = false;
    }

    if (input) {
      input.setAttribute("aria-invalid", "true");
      if (errorElement) {
        const id = errorId(errorElement, key);
        const described = (input.getAttribute("aria-describedby") ?? "").split(/\s+/);
        if (!described.includes(id)) described.push(id);
        input.setAttribute("aria-describedby", described.filter(Boolean).join(" "));
      }
      firstInvalid ??= input;
    }
  }

  return firstInvalid;
}

function setStatus(
  form: FormElement,
  state: "error" | "success" | "info",
  message: string,
): HTMLElement {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  if (!status) throw new Error("lead form status element missing");
  status.textContent = message;
  status.dataset.state = state;
  status.hidden = false;
  return status;
}

function setBusy(form: FormElement, busy: boolean): void {
  form.dataset.busy = String(busy);
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (button) button.disabled = busy;
  const label = form.querySelector<HTMLElement>("[data-submit-label]");
  if (label) label.textContent = busy ? "Отправляем…" : "Отправить заявку";
}

function utmFromLocation(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) result[key] = value.slice(0, 120);
  }
  return result;
}

function loadUtm(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const fresh = utmFromLocation();
  if (Object.keys(fresh).length) {
    try {
      sessionStorage.setItem("cp:utm", JSON.stringify(fresh));
    } catch {
      // Storage can be unavailable in private mode; UTM is non-critical.
    }
    return fresh;
  }

  try {
    const stored = sessionStorage.getItem("cp:utm");
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore malformed or unavailable storage.
  }
  return {};
}

function fillTrackingFields(form: FormElement, utm: ReturnType<typeof loadUtm>): void {
  const pageUrl = form.querySelector<HTMLInputElement>("[data-page-url]");
  const referrer = form.querySelector<HTMLInputElement>("[data-referrer]");
  const startedAt = form.querySelector<HTMLInputElement>("[data-started-at]");

  if (pageUrl) pageUrl.value = window.location.href;
  if (referrer)
    referrer.value = document.referrer.startsWith(window.location.origin) ? "" : document.referrer;
  if (startedAt && !startedAt.value) startedAt.value = String(Date.now());

  form.querySelectorAll<HTMLInputElement>("[data-utm]").forEach((input) => {
    const key = input.dataset.utm as (typeof UTM_KEYS)[number] | undefined;
    if (key) input.value = utm[key] ?? "";
  });
}

function updateContactField(form: FormElement): void {
  const select = form.querySelector<HTMLSelectElement>("[data-contact-method]");
  const input = form.querySelector<HTMLInputElement>("[data-contact-input]");
  const label = form.querySelector<HTMLElement>("[data-contact-label-text]");
  if (!select || !input) return;

  const option = select.selectedOptions[0];
  const methodLabel = option?.dataset.label ?? "Контакт";
  if (label) label.textContent = methodLabel;

  input.placeholder = option?.dataset.placeholder ?? "Выберите способ связи";
  input.type =
    select.value === "email"
      ? "email"
      : select.value === "phone" || select.value === "whatsapp"
        ? "tel"
        : "text";
  input.autocomplete =
    select.value === "email" ? "email" : select.value === "telegram" ? "off" : "tel";
  input.inputMode = (option?.dataset.inputmode as "text" | "tel" | "email" | "none") ?? "text";
}

function showSuccess(form: FormElement): void {
  const wrapper = form.closest<HTMLElement>("[data-lead-form-wrap], .lead-form-wrap");
  const panel = wrapper?.querySelector<HTMLElement>("[data-form-success]");
  if (!panel) return;

  form.hidden = true;
  panel.hidden = false;
  const heading = panel.querySelector<HTMLElement>("h3");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function fallbackContact(form: FormElement, message: string): void {
  const email = form.dataset.email ?? "";
  const telegram = form.dataset.telegram ?? "";
  const status = setStatus(form, "error", message);
  if (!email && !telegram) return;

  const paragraph = document.createElement("p");
  paragraph.append("Напишите напрямую: ");
  if (email) {
    const link = document.createElement("a");
    link.href = `mailto:${email}`;
    link.textContent = email;
    paragraph.append(link);
  }
  if (email && telegram) paragraph.append(" или ");
  if (telegram) {
    const link = document.createElement("a");
    link.href = telegram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Telegram";
    paragraph.append(link);
  }
  status.append(paragraph);
}

async function send(form: FormElement, values: LeadValues): Promise<void> {
  const endpoint = endpointFor(
    (import.meta.env.PUBLIC_LEAD_PROVIDER as LeadProvider | undefined) ?? "formspree",
    (import.meta.env.PUBLIC_LEAD_ENDPOINT ?? "").trim(),
  );

  const payload = buildLeadPayload(values, {
    pageUrl: window.location.href,
    referrer: document.referrer.startsWith(window.location.origin) ? "" : document.referrer,
    startedAt: Number(new FormData(form).get("startedAt") ?? 0),
    idempotencyKey: crypto.randomUUID(),
    source: form.dataset.source ?? "site",
    utm: loadUtm(),
  });

  if (!endpoint) {
    track("lead_fallback", { reason: "no_endpoint" });
    const email = form.dataset.email ?? "";
    const telegram = form.dataset.telegram ?? "";
    if (email) {
      const subject = encodeURIComponent(String(payload._subject));
      const body = encodeURIComponent(`${payload.summary}\n\nСтраница: ${payload.page}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus(
        form,
        "info",
        "Открываем почтовый клиент. Если он не открылся — напишите на почту напрямую.",
      );
      return;
    }
    fallbackContact(
      form,
      telegram
        ? "Форма пока не подключена к приёмнику. Напишите нам в Telegram."
        : "Форма пока не подключена к приёмнику. Настройте PUBLIC_LEAD_ENDPOINT перед запуском.",
    );
    return;
  }

  setBusy(form, true);
  setStatus(form, "info", "Отправляем заявку…");

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Lead endpoint returned ${response.status}`);
    }

    track("lead_success", { source: form.dataset.source ?? "site", degree: values.degree });
    showSuccess(form);
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === "AbortError";
    track("lead_error", {
      source: form.dataset.source ?? "site",
      reason: aborted ? "timeout" : "request_failed",
    });
    fallbackContact(
      form,
      aborted
        ? "Сервер не ответил вовремя. Попробуйте ещё раз или напишите напрямую."
        : "Не получилось отправить заявку. Попробуйте ещё раз или напишите напрямую.",
    );
  } finally {
    window.clearTimeout(timeout);
    setBusy(form, false);
  }
}

function initForm(form: FormElement): void {
  const utm = loadUtm();
  fillTrackingFields(form, utm);

  const contactSelect = form.querySelector<HTMLSelectElement>("[data-contact-method]");
  updateContactField(form);
  contactSelect?.addEventListener("change", () => {
    updateContactField(form);
    const input = form.querySelector<HTMLInputElement>("[data-contact-input]");
    if (input?.getAttribute("aria-invalid") === "true") {
      clearErrors(form);
    }
  });

  form.addEventListener("input", (event) => {
    const target = event.target as HTMLElement | null;
    const name = target?.getAttribute("name");
    if (!name) return;
    const errorElement = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (errorElement) {
      errorElement.hidden = true;
      errorElement.textContent = "";
    }
    target?.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.busy === "true") return;

    const raw = rawValues(form);
    if (String(raw.website ?? "").length > 0) {
      showSuccess(form);
      return;
    }

    const parsed = validateLead(raw);
    if (!parsed.success) {
      const firstInvalid = showErrors(form, parsed.errors);
      setStatus(form, "error", "Проверьте выделенные поля.");
      firstInvalid?.focus({ preventScroll: false });
      return;
    }

    const startedAt = Number(new FormData(form).get("startedAt") ?? 0);
    if (startedAt && Date.now() - startedAt < 300) {
      showSuccess(form);
      return;
    }

    track("lead_submit", { source: form.dataset.source ?? "site", degree: parsed.data.degree });
    await send(form, parsed.data);
  });

  const reset = form.closest(".lead-form-wrap")?.querySelector<HTMLElement>("[data-form-reset]");
  reset?.addEventListener("click", () => {
    const success = form
      .closest(".lead-form-wrap")
      ?.querySelector<HTMLElement>("[data-form-success]");
    form.reset();
    form.hidden = false;
    if (success) success.hidden = true;
    const startedAt = form.querySelector<HTMLInputElement>("[data-started-at]");
    if (startedAt) startedAt.value = String(Date.now());
    updateContactField(form);
    clearErrors(form);
    const status = form.querySelector<HTMLElement>("[data-form-status]");
    if (status) status.hidden = true;
    form.querySelector<HTMLElement>("input[name='name']")?.focus();
  });
}

document.querySelectorAll<FormElement>("[data-lead-form]").forEach(initForm);
