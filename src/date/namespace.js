import { createNamespace } from '../core';
import { isString } from '../util/typeChecks';
import create from './create';

/**
 * Creates a new wrapped Date chainable.
 *
 * @param {any} [date] - The date to wrap. Accepts the same arguments as the
 *   native Date constructor: When no arguments are passed will wrap the current
 *   date. If a string is passed, will use `parse`, which understands a wide
 *   variety of formats. Passing a number will create a date from a timestamp.
 *   Enumerated arguments creates the date from year, month, day, etc.
 *
 * @returns {SugarChainable<Date>}
 *
 * @example
 *
 *   new Sugar.Date();
 *   new Sugar.Date('2020-09-14T12:00:00Z');
 *   new Sugar.Date('tomorrow');
 *   new Sugar.Date(1600013909535);
 *   new Sugar.Date(2020, 8, 14);
 *
 **/
const Namespace = createNamespace('Date', (...args) => {
  if (isString(args[0])) {
    return create(...args);
  } else {
    return new Date(...args);
  }
});

export const {
  extend,
  defineStatic,
  defineInstance,
  defineStaticAlias,
  defineInstanceAlias,
} = Namespace;
export { Namespace as Date };