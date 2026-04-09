import { Question } from "./types";
import { level1Questions } from "./questions/level1";
import { level2Questions } from "./questions/level2";
import { level3Questions } from "./questions/level3";
import { level4Questions } from "./questions/level4";
import { level5Questions } from "./questions/level5";

export const questions: Question[] = [
  ...level1Questions,
  ...level2Questions,
  ...level3Questions,
  ...level4Questions,
  ...level5Questions,
];
