import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing renders content and navigates to destinations", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Education");
  await expect(page.locator(".program-grid article")).toHaveCount(5);
  await expect(page.locator(".uni-card")).toHaveCount(6);
  await expect(page.locator(".faq-item")).toHaveCount(5);

  await page.getByRole("link", { name: "Explore China" }).click();
  await expect(page).toHaveURL(/\/destinations\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("One active route");

  expect(errors).toEqual([]);
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, locks scroll and closes after navigation", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-menu-toggle]");
    const menu = page.locator("[data-menu]");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toHaveAttribute("data-open", "true");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

    await menu.getByRole("link", { name: "Programs" }).click();
    await expect(page).toHaveURL(/\/programs\/$/);
    await expect(menu).toHaveAttribute("data-open", "false");
  });
});

test("university directory filters without a page reload", async ({ page }) => {
  await page.goto("/universities/");
  await expect(page.locator(".uni-card")).toHaveCount(17);

  await page.fill("[data-uni-search]", "Shenyang");
  await expect(page.locator(".uni-card:visible")).toHaveCount(1);

  await page.fill("[data-uni-search]", "");
  await page.getByRole("button", { name: "PhD" }).click();
  const visible = page.locator(".uni-card:visible");
  expect(await visible.count()).toBeGreaterThan(0);
  await expect(visible.first()).toContainText("PhD");
});

test("lead form validates, submits and keeps the payload complete", async ({ page }) => {
  let payload: Record<string, unknown> | undefined;

  await page.route("https://lead.test/**", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/apply/");
  await page.getByRole("button", { name: "Send application" }).click();
  await expect(page.locator("[data-form-status]")).toContainText(
    "Please check the highlighted fields",
  );

  await page.fill("#lead-name", "Anna Lee");
  await page.fill("#lead-nationality", "Moroccan");
  await page.selectOption("#lead-contact-method", "whatsapp");
  await page.fill("#lead-contact", "+212600000000");
  await page.selectOption("#lead-education", "bachelor");
  await page.selectOption("#lead-degree", "master");
  await page.selectOption("#lead-direction", "business");
  await page.selectOption("#lead-destination", "china");
  await page.selectOption("#lead-scholarship", "preferred");
  await page.selectOption("#lead-budget", "10000_20000");
  await page.selectOption("#lead-intake", "2027");
  await page.fill("#lead-message", "Finance, IELTS 7.0, budget up to $20,000 per year.");
  await page.check("input[name='consent']");
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: "Send application" }).click();

  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
  expect(payload).toBeTruthy();
  expect(payload?.name).toBe("Anna Lee");
  expect(payload?.contact).toBe("+212600000000");
  expect(payload?.nationality).toBe("Moroccan");
  expect(payload?.degree).toBe("master");
  expect(payload?.destination).toBe("china");
  expect(payload?.consent).toBe(true);
  expect(payload?.idempotencyKey).toBeTruthy();
});

test("home and apply pages have no serious accessibility violations", async ({ page }) => {
  for (const path of ["/", "/apply/"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );
    expect(
      serious.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      })),
    ).toEqual([]);
  }
});
