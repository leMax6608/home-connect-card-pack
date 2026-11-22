import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const readme = readFileSync(resolve(root, "README.md"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
const imageRoot = "https://raw.githubusercontent.com/leMax6608/home-connect-card-pack/main/";

describe("published documentation assets", () => {
  it("uses existing PNGs at absolute URLs for HACS", () => {
    const references = [...readme.matchAll(/(?:src="|\]\()(https:\/\/raw\.githubusercontent\.com\/[^\s"\)]+)/g)];
    expect(references).toHaveLength(8);
    for (const [, url] of references) {
      expect(url.startsWith(imageRoot)).toBe(true);
      const path = resolve(root, url.slice(imageRoot.length));
      expect(existsSync(path), url).toBe(true);
      const png = readFileSync(path);
      expect(png.subarray(1, 4).toString()).toBe("PNG");
      expect(png.readUInt32BE(16)).toBeGreaterThan(0);
      expect(png.readUInt32BE(20)).toBeGreaterThan(0);
    }
  });

  it("constrains all six real screenshots and keeps expanded views collapsible", () => {
    const images = [...readme.matchAll(/<img[^>]+(?:compact|expanded)\.png[^>]+>/g)];
    expect(images).toHaveLength(6);
    for (const [tag] of images) expect(tag).toContain('width="552"');
    expect([...readme.matchAll(/<details>/g)]).toHaveLength(3);
    expect([...readme.matchAll(/<\/details>/g)]).toHaveLength(3);
  });
});
