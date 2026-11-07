import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.join(process.cwd(), "src/content");

async function readJsonDir(name: string) {
  const dir = path.join(root, name);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
  const items = await Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(dir, file), "utf8"))),
  );
  return items;
}

const placeholder = /TODO|TBD|lorem ipsum|\[insert/i;

describe("content collections", () => {
  it("ships at least seven complete program routes", async () => {
    const programs = await readJsonDir("programs");
    expect(programs.length).toBeGreaterThanOrEqual(7);
    expect(new Set(programs.map((program) => program.order)).size).toBe(programs.length);

    for (const program of programs) {
      expect(program.title.length).toBeGreaterThan(5);
      expect(program.summary.length).toBeGreaterThan(40);
      expect(program.overview.length).toBeGreaterThan(0);
      expect(program.fitFor.length).toBeGreaterThan(0);
      expect(program.outcomes.length).toBeGreaterThan(0);
      expect(program.timeline.length).toBeGreaterThan(0);
      expect(program.duration).toBeTruthy();
      expect(program.tuition).toBeTruthy();
      expect(JSON.stringify(program)).not.toMatch(placeholder);
    }
  });

  it("keeps university links unique, official and HTTPS", async () => {
    const universities = await readJsonDir("universities");
    expect(universities.length).toBeGreaterThanOrEqual(6);
    const urls = universities.map((university) => university.officialUrl);
    expect(new Set(urls).size).toBe(urls.length);
    for (const university of universities) {
      expect(university.officialUrl).toMatch(/^https:\/\//);
      expect(university.officialUrl).not.toMatch(placeholder);
      expect(university.strengths.length).toBeGreaterThan(0);
      expect(university.note.length).toBeGreaterThan(40);
    }
  });

  it("has substantial FAQ answers and at least five home entries", async () => {
    const faq = await readJsonDir("faq");
    expect(faq.length).toBeGreaterThanOrEqual(8);
    expect(faq.filter((item) => item.home).length).toBeGreaterThanOrEqual(5);
    for (const item of faq) {
      expect(item.question).toMatch(/\?$/);
      expect(item.answer.length).toBeGreaterThan(120);
      expect(item.answer).not.toMatch(placeholder);
    }
  });
});
