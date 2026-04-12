import { chromium } from "playwright";

const BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const URL = "http://localhost:5173/";

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-320", width: 320, height: 568 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 900 },
];

const browser = await chromium.launch({ executablePath: BRAVE, headless: true });

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(URL, { waitUntil: "networkidle" });
  // Force all reveal elements visible
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/volley-${vp.name}.png`, fullPage: true });
  console.log(`Captured ${vp.name}`);
  await page.close();
}

await browser.close();
