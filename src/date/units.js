import { getUnitMultiplier } from './util/units';

/**
 * Takes a number as a unit and converts to milliseconds.
 *
 * @extra Note that months and years are ambiguous units of time. For generic
 *   purposes here, years are equivalent to 365.2425 days, or the number of
 *   years across a complete 400 year leap cycle. Months are equivalent to that
 *   average / 12, or roughly 30.437 days. These units should not be used where
 *   precision is needed. Lastly, weeks and days are technically ambiguous as
 *   well, as the number of hours in a day may not be 24 during DST shifts in
 *   applicable timezones, however this is intentionally ignored here for
 *   simplicity and consistency.
 *
 *   Singular methods are also provided as a readable alias when using
 *   chainables.
 *
 * @param {number} n - The number.
 *
 * @returns {number}
 *
 * @example
 *
 *   (5).seconds() -> 5 * 1000
 *   (5).minutes() -> 5 * 60000
 *   (5).days() -> 5 * 86400000
 *   (5).years() -> 157784760000
 *   (5).days() -> 86400000
 *
 * @method second
 * @method seconds
 * @method minute
 * @method minutes
 * @method hour
 * @method hours
 * @method day
 * @method days
 * @method week
 * @method weeks
 * @method month
 * @method months
 * @method year
 * @method years
 **/
export function years(n) {
  return getInMilliseconds(n, 'year');
}

export function months(n) {
  return getInMilliseconds(n, 'month');
}

export function weeks(n) {
  return getInMilliseconds(n, 'week');
}

export function days(n) {
  return getInMilliseconds(n, 'day');
}

export function hours(n) {
  return getInMilliseconds(n, 'hours');
}

export function minutes(n) {
  return getInMilliseconds(n, 'minutes');
}

export function seconds(n) {
  return getInMilliseconds(n, 'seconds');
}

function getInMilliseconds(n, unit) {
  return Math.round(n * getUnitMultiplier(unit));
}
