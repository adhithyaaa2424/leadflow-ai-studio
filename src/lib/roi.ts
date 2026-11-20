export interface RoiInputs {
  /** People on the team doing repetitive work. */
  teamSize: number;
  /** Hours per person per week spent on repetitive tasks. */
  hoursPerWeek: number;
  /** Fully loaded cost of one hour of that work, in USD. */
  hourlyCost: number;
  /** Share of those hours automation can remove, 0–100. */
  automationRate: number;
}

export interface RoiResult {
  weeklyHoursSaved: number;
  monthlyHoursSaved: number;
  monthlySavings: number;
  annualSavings: number;
  /** Full-time equivalents freed up, based on a 40-hour week. */
  fteFreed: number;
}

const WEEKS_PER_YEAR = 52;
const HOURS_PER_FTE_WEEK = 40;

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const rate = Math.min(Math.max(inputs.automationRate, 0), 100) / 100;
  const teamSize = Math.max(inputs.teamSize, 0);
  const hours = Math.max(inputs.hoursPerWeek, 0);
  const cost = Math.max(inputs.hourlyCost, 0);

  const weeklyHoursSaved = teamSize * hours * rate;
  const annualHoursSaved = weeklyHoursSaved * WEEKS_PER_YEAR;
  const annualSavings = annualHoursSaved * cost;

  return {
    weeklyHoursSaved,
    monthlyHoursSaved: annualHoursSaved / 12,
    monthlySavings: annualSavings / 12,
    annualSavings,
    fteFreed: weeklyHoursSaved / HOURS_PER_FTE_WEEK,
  };
}
