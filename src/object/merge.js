import { assertPlainObject } from '../util/object';
import { isFunction } from '../util/typeChecks';
import { mergeDeep } from '../util/merge';

/**
 * Performs a deep merge of properties from source object(s) into a target
 *   object.
 *
 * @extra This method will modify the object! Use `add` for a non-destructive
 *   alias. Inherited and non-enumerable properties will not be merged.
 *   Enumerable getters will be merged by value only. An error will be thrown
 *   if any object passed is not "plain", created by either bracket syntax or
 *   `Object.create`. Cyclic objects will throw a TypeError.
 *
 *   For a shallow merge use `Object.assign` or the
 *   [object spread syntax](https://mzl.la/2ZyFTyz) instead.
 *
 * @param {Object} target - The target object.
 * @param {...Object} - Source objects are enumerated as arguments here.
 * @param {resolverFn} [resolver] - A function to determine the value when a
 *   collision occurs. If this function is not provided or returns `undefined`,
 *   the value of the last provided source object in which this property exists
 *   will be used, or will deeply merge in the case of plain objects. Must be
 *   passed as the last argument.
 *
 * @returns {Object}
 *
 * @callback resolverFn
 *
 *   key  The key of the current entry.
 *   tVal The value in `target` for the current entry.
 *   sVal The value in `source` for the current entry.
 *   target A reference to the target object.
 *   source A reference to the source object.
 *
 * @example
 *
 *   Object.merge({a:1}, {a:1,b:2}) -> {a:1,b:2}
 *   Object.merge({a:1,b:2}, {a:2}) -> {a:1,b:2}
 *   Object.merge({a:1,b:2}, {a:2}, (key, n1, n2) => n1 + n2) -> {a:3,b:2}
 *
 **/
export default function merge(target, ...args) {
  assertPlainObject(target);
  let sources;
  let resolver;
  if (isFunction(args[args.length - 1])) {
    sources = args.slice(0, -1);
    resolver = args[args.length - 1];
  } else {
    sources = args;
  }
  for (let source of sources) {
    assertPlainObject(source);
    mergeDeep(target, source, resolver);
  }
  return target;
}
