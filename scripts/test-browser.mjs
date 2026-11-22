import { createServer } from "node:http";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const chrome = process.env.CHROME_BIN || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find(existsSync);
if (!chrome) throw new Error("Chrome/Chromium not found. Set CHROME_BIN to its executable path.");
const allowed = new Map([
  ["/tests/browser.html", ["tests/browser.html", "text/html; charset=utf-8"]],
  ["/dist/home-connect-card-pack.js", ["dist/home-connect-card-pack.js", "text/javascript; charset=utf-8"]],
]);
const server = createServer(async (request, response) => {
  const entry = allowed.get(new URL(request.url, "http://localhost").pathname);
  if (!entry) { response.writeHead(404).end(); return; }
  try { const content = await readFile(resolve(root, entry[0])); response.writeHead(200, { "Content-Type": entry[1] }).end(content); }
  catch { response.writeHead(500).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const profile = await mkdtemp(join(tmpdir(), "home-connect-browser-"));
try {
  const url = `http://127.0.0.1:${server.address().port}/tests/browser.html`;
  const dom = await new Promise((resolve, reject) => {
    const child = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-first-run",
      `--user-data-dir=${profile}`, "--virtual-time-budget=5000", "--dump-dom", url], { windowsHide: true });
    let output = "", errors = "";
    const timer = setTimeout(() => { child.kill(); reject(new Error("Browser regression checks timed out.")); }, 20000);
    child.stdout.on("data", data => { output += data; });
    child.stderr.on("data", data => { errors += data; });
    child.on("error", error => { clearTimeout(timer); reject(error); });
    child.on("close", code => { clearTimeout(timer); code === 0 ? resolve(output) : reject(new Error(errors || `Chrome exited ${code}`)); });
  });
  const result = dom.match(/<pre id="qa-results">([\s\S]*?)<\/pre>/)?.[1];
  if (!dom.includes('data-qa="passed"')) throw new Error(result || "Browser fixture did not finish.");
  const count = result?.match(/(?:"|&quot;)checks(?:"|&quot;): (\d+)/)?.[1];
  console.log(`Browser regression checks passed (${count || "all"} checks across five cards and editors).`);
} finally {
  server.close();
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
