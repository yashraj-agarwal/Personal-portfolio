import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";

const source = await fs.readFile(
  "src/components/ui/contribution-skyline.tsx",
  "utf8",
);
const pure = source
  .split("// #region contributions")[1]
  .split("// #endregion")[0];
const code = ts.transpileModule(pure, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const skyline = await import(
  `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
);
const end = skyline.dayMs("2026-10-19");
const data = [
  { date: "2026-10-17", count: 2 },
  { date: "2026-10-18", count: 3 },
  { date: "2026-10-18", count: 4 },
];
const grid = skyline.buildGrid(data, end);
const stats = skyline.computeStats(grid.cells);
assert.equal(stats.total, 9, "Repeated dates should add up");
assert.equal(stats.longest.days, 2);
assert.equal(stats.current.days, 2, "A streak ending yesterday stays current");
assert.equal(stats.busiest.count, 7);
assert.equal(grid.cells.at(-1).date, "2026-10-19");
assert.equal(grid.cells[0].day, 0);
assert.equal(
  new Set(grid.cells.map((day) => day.date)).size,
  grid.cells.length,
);
assert.equal(
  skyline.dayMs("2026-10-19T23:59:00+05:30"),
  end,
  "Calendar dates should not drift with timezone",
);
assert.equal(skyline.computeStats(skyline.buildGrid([], end).cells).total, 0);
for (const cell of grid.cells) {
  assert(cell.level >= 0 && cell.level <= 4);
  assert.equal(skyline.riseAt(0, cell.week, grid.weeks, cell.day), 0);
  assert.equal(skyline.riseAt(1, cell.week, grid.weeks, cell.day), 1);
  for (const t of [0, 0.25, 0.5, 0.75, 1])
    assert(
      skyline
        .project(skyline.camera(t), cell.week, cell.day, 4)
        .every(Number.isFinite),
    );
}
console.log(
  "Passed: contribution dates, duplicate counts, streaks, levels, and animation/projection bounds.",
);
