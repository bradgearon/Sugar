import { defineStatic, defineInstance } from '../core/string';
import * as methods from './methods';

defineStatic('range', methods.range);
defineInstance('at', methods.at);
defineInstance('camelize', methods.camelize);
defineInstance('capitalize', methods.capitalize);
defineInstance('compact', methods.compact);
defineInstance('dasherize', methods.dasherize);
defineInstance('first', methods.first);
defineInstance('from', methods.from);
defineInstance('isBlank', methods.isBlank);
defineInstance('isEmpty', methods.isEmpty);
defineInstance('last', methods.last);
defineInstance('pad', methods.pad);
defineInstance('parameterize', methods.parameterize);
defineInstance('reverse', methods.reverse);
defineInstance('spacify', methods.spacify);
defineInstance('titleize', methods.titleize);
defineInstance('to', methods.to);
defineInstance('toNumber', methods.toNumber);
defineInstance('truncate', methods.truncate);
defineInstance('truncateOnWord', methods.truncateOnWord);
defineInstance('underscore', methods.underscore);
