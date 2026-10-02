import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

describe("Brand Identity Migration Assertions", () => {
  const srcFiles = getAllFiles(path.resolve(__dirname, "../src"));
  const publicFiles = getAllFiles(path.resolve(__dirname, "../public"));
  const allTargetFiles = [...srcFiles, ...publicFiles].filter(
    (f) => !f.endsWith(".png") && !f.endsWith(".ico") && !f.endsWith(".jpg")
  );

  it("ensures zero occurrences of CampusPrep in source and public files", () => {
    const violations: { file: string; line: number; content: string }[] = [];

    for (const filePath of allTargetFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        if (/campusprep/i.test(line)) {
          violations.push({
            file: path.relative(path.resolve(__dirname, ".."), filePath),
            line: index + 1,
            content: line.trim(),
          });
        }
      });
    }

    expect(
      violations,
      `Found ${violations.length} lingering CampusPrep reference(s):\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  });

  it("ensures zero occurrences of standalone Forge branding in app, components, and public metadata", () => {
    const violations: { file: string; line: number; content: string }[] = [];
    const brandFiles = allTargetFiles.filter((f) => {
      const rel = path.relative(path.resolve(__dirname, ".."), f).replace(/\\/g, "/");
      return (
        rel.startsWith("src/app/") ||
        rel.startsWith("src/components/") ||
        rel.startsWith("src/lib/") ||
        rel.startsWith("public/manifest.json") ||
        rel.startsWith("public/site.webmanifest")
      );
    });

    for (const filePath of brandFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        // Match "Forge" as a standalone brand name (not "forget", "forgetting", etc.)
        if (/\bForge\b/.test(line)) {
          violations.push({
            file: path.relative(path.resolve(__dirname, ".."), filePath),
            line: index + 1,
            content: line.trim(),
          });
        }
      });
    }

    expect(
      violations,
      `Found ${violations.length} lingering Forge brand reference(s):\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  });
});
