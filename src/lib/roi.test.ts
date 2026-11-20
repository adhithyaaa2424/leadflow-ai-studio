import { describe, expect, it } from "vitest";
import { calculateRoi } from "./roi";

describe("calculateRoi", () => {
  it("multiplies team size, weekly hours and automation rate for hours saved", () => {
    const r = calculateRoi({ teamSize: 5, hoursPerWeek: 10, hourlyCost: 40, automationRate: 60 });
    expect(r.weeklyHoursSaved).toBe(30);
    expect(r.fteFreed).toBe(0.75);
  });

  it("annualises savings over 52 weeks at the hourly cost", () => {
    const r = calculateRoi({ teamSize: 5, hoursPerWeek: 10, hourlyCost: 40, automationRate: 60 });
    expect(r.annualSavings).toBe(62400);
    expect(r.monthlySavings).toBe(5200);
  });

  it("clamps automation rate to 100%", () => {
    const r = calculateRoi({ teamSize: 1, hoursPerWeek: 10, hourlyCost: 10, automationRate: 150 });
    expect(r.weeklyHoursSaved).toBe(10);
  });
});
