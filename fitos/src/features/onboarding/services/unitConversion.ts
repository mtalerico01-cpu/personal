export function lbsToKg(lbs: number) {
  return lbs / 2.2046226218;
}

export function kgToLbs(kg: number) {
  return kg * 2.2046226218;
}

export function inchesToCm(inches: number) {
  return inches * 2.54;
}

export function cmToInches(cm: number) {
  return cm / 2.54;
}

export function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}
