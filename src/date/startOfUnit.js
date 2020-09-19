import { assertDate } from '../util/assertions';
import { resetByUnit } from './util/reset';
import { setWeekday } from './util/weekdays';

/**
 * Resets the date to the beginning of the unit. All lower units will also be
 *   reset.
 *
 * @extra This method modifies the date! Note that `startOfWeek` resets to
 *   Sunday, and `startOfISOWeek` resets to Monday. Locales are not considered
 *   in `startOfWeek` as this cannot be reliably determined with current native
 *   APIs.
 *
 * @param {Date} date - The date.
 *
 * @returns {Date}
 *
 * @example
 *
 *   new Date(2020, 0, 1, 12).startOfDay() -> 2020-01-01
 *   new Date(2020, 0).startOfWeek() -> 2019-12-29
 *   new Date(2020, 0).startOfISOWeek() -> 2019-12-30
 *
 * @method startOfYear
 * @method startOfMonth
 * @method startOfWeek
 * @method startOfISOWeek
 * @method startOfDay
 * @method startOfHour
 * @method startOfMinute
 * @method startOfSecond
 **/
export function startOfYear(date) {
  return startOf(date, 'year');
}

export function startOfMonth(date) {
  return startOf(date, 'month');
}

export function startOfWeek(date) {
  assertDate(date);
  setWeekday(date, 0);
  startOfDay(date);
  return date;
}

export function startOfISOWeek(date) {
  assertDate(date);
  setWeekday(date, date.getDay() === 0 ? -6 : 1);
  startOfDay(date);
  return date;
}

export function startOfDay(date) {
  return startOf(date, 'day');
}

export function startOfHour(date) {
  return startOf(date, 'hours');
}

export function startOfMinute(date) {
  return startOf(date, 'minutes');
}

export function startOfSecond(date) {
  return startOf(date, 'seconds');
}

function startOf(date, unit) {
  assertDate(date);
  resetByUnit(date, unit);
  return date;
}
