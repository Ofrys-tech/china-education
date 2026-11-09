import { copy } from "@/i18n";

const input = document.querySelector<HTMLInputElement>("[data-uni-search]");
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-uni-card]"));
const filters = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-uni-filter]"));
const count = document.querySelector<HTMLElement>("[data-uni-count]");
const empty = document.querySelector<HTMLElement>("[data-uni-empty]");

if (input && cards.length > 0) {
  let active = "all";
  const total = cards.length;

  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    for (const card of cards) {
      const matchesQuery = !query || (card.dataset.search ?? "").includes(query);
      const levels = (card.dataset.levels ?? "").split(" ");
      const matchesLevel = active === "all" || levels.includes(active);
      const show = matchesQuery && matchesLevel;
      card.hidden = !show;
      if (show) visible += 1;
    }

    if (count) {
      count.textContent = `${visible} / ${total} ${copy.universities.search.count}`;
    }
    if (empty) empty.hidden = visible > 0;
  };

  input.addEventListener("input", apply);

  for (const button of filters) {
    button.addEventListener("click", () => {
      active = button.dataset.uniFilter ?? "all";
      for (const item of filters) {
        item.setAttribute("aria-pressed", String(item === button));
      }
      apply();
    });
  }

  apply();
}
