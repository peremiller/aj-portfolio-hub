import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });

try {
  for (const width of [320, 390, 1280]) {
    for (const dark of [false, true]) {
      await test(`portfolio ${width}px ${dark ? "dark" : "light"}: accessible navigation, routes and preserved favorites`, async () => {
        const context = await browser.newContext({ viewport: { width, height: 850 } });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.route("**/api/suno**", (route) =>
          route.fulfill({ status: 503, contentType: "application/json", body: '{"error":"Offline test"}' }));
        await page.addInitScript((isDark) => {
          localStorage.setItem("aj-dark-mode", JSON.stringify(isDark));
          if (localStorage.getItem("aj-favorites") === null) localStorage.setItem("aj-favorites", JSON.stringify(["preserve-existing-favorite"]));
        }, dark);

        try {
          const response = await page.goto(`${base}/applications`, { waitUntil: "networkidle" });
          assert.equal(response.status(), 200, "deep-linked page should load");
          assert.equal(await page.locator("h1").first().innerText(), "Useful products, shipped");
          assert.equal(await page.locator("html").getAttribute("data-mode"), dark ? "dark" : "light");
          assert.equal(await page.locator("html").getAttribute("data-theme"), "default");
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, "horizontal overflow");
          await page.keyboard.press("Tab");
          assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("skip-link")), true, "skip navigation must be first focus");

          const firstCategory = page.locator(".filter-row button").nth(1);
          await firstCategory.click();
          assert.equal(await firstCategory.getAttribute("aria-pressed"), "true", "category filter selected state");
          await page.locator(".filter-row button").first().click();
          assert.equal(await page.locator(".filter-row button").first().getAttribute("aria-pressed"), "true");

          if (width < 600) {
            const opener = page.getByRole("button", { name: "Open menu" });
            await opener.click();
            assert.equal(await page.getByRole("dialog", { name: "Menu" }).isVisible(), true, "drawer should open");
            assert.equal(await page.getByRole("dialog", { name: "Menu" }).getAttribute("aria-modal"), "true");
            assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close menu", "focus should enter drawer");
            await page.keyboard.press("Shift+Tab");
            assert.equal(await page.evaluate(() => document.activeElement?.closest(".mobile-drawer") !== null), true, "reverse Tab stays in drawer");
            await page.keyboard.press("Tab");
            assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close menu", "forward Tab wraps");
            await page.keyboard.press("Escape");
            assert.equal(await opener.getAttribute("aria-expanded"), "false");
            assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Open menu", "Escape restores opener focus");

            await opener.click();
            await page.locator(".mobile-drawer nav").getByRole("button", { name: "Music" }).click();
            assert.equal(await page.evaluate(() => location.pathname), "/music");
            assert.equal(await page.evaluate(() => document.activeElement?.id), "main-content", "drawer navigation should focus main");
          } else {
            await page.locator(".desktop-nav").getByRole("button", { name: "Music" }).click();
            assert.equal(await page.evaluate(() => location.pathname), "/music");
          }

          await page.goBack({ waitUntil: "domcontentloaded" });
          assert.equal(await page.evaluate(() => location.pathname), "/applications", "browser Back returns to deep link");
          await page.reload({ waitUntil: "networkidle" });
          assert.equal(await page.locator("h1").first().innerText(), "Useful products, shipped");
          assert.equal(await page.evaluate(() => localStorage.getItem("aj-favorites")), '["preserve-existing-favorite"]');
          assert.deepEqual(errors, [], "no unhandled browser errors");
        } finally {
          await context.close();
        }
      });
    }
  }

  await test("music API failure truthfully displays saved highlights", async () => {
    const page = await browser.newPage();
    try {
      await page.route("**/api/suno**", route =>
        route.fulfill({ status: 503, contentType: "application/json", body: '{"error":"unavailable"}' }));
      await page.goto(`${base}/music`, { waitUntil: "networkidle" });
      assert.match(await page.locator(".catalog-sync").innerText(), /Showing saved highlights/);
      assert.equal(await page.locator(".catalog-sync").getAttribute("role"), "status");
    } finally {
      await page.close();
    }
  });
} finally {
  await browser.close();
}
