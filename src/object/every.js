import { assertObject } from '../util/assertions';
import { forEachProperty } from '../util/helpers';
import { getMatcher } from '../util/matchers';

/**
 * Returns true if all values in the object match input.
 *
 * @param {Object} obj - The object.
 * @param {any|searchFn} match - A matcher to determine how values are checked.
 * When a function is passed a truthy return value will match. Primitives will
 * directly match values. Can also be a Date object to match dates, a RegExp
 * which will test against strings, or a plain object which will perform a
 * "fuzzy match" on specific properties. Values of a fuzzy match can be any of
 * the matcher types listed above.
 *
 * @returns {boolean}
 *
 * @example
 *
 *   Object.every({a:1,b:2}, 1) -> false
 *   Object.every({a:1,b:1}, 1) -> true
 *   Object.every({a:'a',b:'b'}, /[a-f]) -> true
 *   Object.every(usersById, user => {
 *     return user.age > 30;
 *   }); -> true if all users are older than 30
 *
 **/
export default function every(obj, match) {
  assertObject(obj);
  if (arguments.length === 1) {
    throw new Error('Match parameter required');
  }
  const matcher = getMatcher(match);
  let result = true;
  forEachProperty(obj, (key, val) => {
    if (!matcher(val, key, obj)) {
      result = false;
    }
    return result;
  });
  return result;
}