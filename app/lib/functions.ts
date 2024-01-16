import { db } from "./db";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const randomKey = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);


