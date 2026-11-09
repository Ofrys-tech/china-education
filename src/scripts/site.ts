import { common } from "@/i18n/en/common";
import { track } from "@/lib/analytics";

const MOBILE_QUERY = "(max-width: 960px)";

function setupMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    const srLabel = toggle.querySelector(".sr-only");
    if (srLabel) srLabel.textContent = open ? common.header.closeMenu : common.header.openMenu;
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

  const groups = new Map<Element, number>();
  elements.forEach((element) => {
    const parent = element.parentElement;
    if (!parent) return;
    const index = groups.get(parent) ?? 0;
    element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 350)}ms`);
    groups.set(parent, index + 1);
  });

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

function setupHeader(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.dataset.scrolled = String(window.scrollY > 24);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

function setupFloat(): void {
  const float = document.querySelector<HTMLElement>(".wa-float");
  if (!float) return;

  let formVisible = false;
  let footerVisible = false;
  let ticking = false;
  const update = () => {
    float.dataset.visible = String(window.scrollY > 620 && !formVisible && !footerVisible);
    ticking = false;
  };

  const forms = document.querySelectorAll<HTMLElement>("[data-lead-form]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        formVisible = entries.some((entry) => entry.isIntersecting);
        update();
      },
      { threshold: 0.12 },
    );
    forms.forEach((form) => {
      observer.observe(form);
    });

    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (footer) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          footerVisible = entries.some((entry) => entry.isIntersecting);
          update();
        },
        { threshold: 0.05 },
      );
      footerObserver.observe(footer);
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
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
setupHeader();
setupFloat();
setupTracking();
