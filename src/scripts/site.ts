import { track } from "@/lib/analytics";

const MOBILE_QUERY = "(max-width: 960px)";

function setupMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only")!.textContent = open ? "Закрыть меню" : "Открыть меню";
    menu.dataset.open = String(open);
    document.body.dataset.menuOpen = String(open);
    if (!open) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
    if (open) menu.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
    }
  });

  menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  const desktop = window.matchMedia(MOBILE_QUERY);
  desktop.addEventListener("change", (event) => {
    if (!event.matches) setOpen(false);
  });
}

function setupReveals(): void {
  if (!document.documentElement.classList.contains("js")) return;

  const elements = document.querySelectorAll<HTMLElement>(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-in");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function setupTracking(): void {
  document.addEventListener("click", (event) => {
    const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
    if (!target) return;
    const name = target.dataset.track;
    if (!name) return;
    track(name, {
      page: window.location.pathname,
      label: target.dataset.trackLabel ?? target.textContent?.trim().slice(0, 60) ?? "",
    });
  });
}

setupMenu();
setupReveals();
setupTracking();
