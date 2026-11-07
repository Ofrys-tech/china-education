import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing renders content and navigates to programs", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("China");
  await expect(page.locator(".program-grid article")).toHaveCount(6);
  await expect(page.locator(".university-row")).toHaveCount(6);
  await expect(page.locator(".faq-item")).toHaveCount(5);

  await page.getByRole("link", { name: "Explore programs" }).click();
  await expect(page).toHaveURL(/\/programs\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Programs");

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
  await page.selectOption("#lead-contact-method", "telegram");
  await page.fill("#lead-contact", "@anna_lee");
  await page.selectOption("#lead-degree", "master");
  await page.selectOption("#lead-direction", "business");
  await page.selectOption("#lead-intake", "2027");
  await page.fill("#lead-message", "Finance, IELTS 7.0, budget up to ¥30,000 per year.");
  await page.check("input[name='consent']");
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: "Send application" }).click();

  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
  expect(payload).toBeTruthy();
  expect(payload?.name).toBe("Anna Lee");
  expect(payload?.contact).toBe("@anna_lee");
  expect(payload?.degree).toBe("master");
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
