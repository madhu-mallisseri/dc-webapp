import _debug from 'debug';

const debug = _debug('app:config');
console.log('Create configuration.');
import base from './_base';

console.log('Apply environment overrides for NODE_ENV "${base.env}".');
let overrides;
try {
  overrides = require(`./_${base.env}`)(base);
} catch (e) {
  console.log(
    'No configuration overrides found for NODE_ENV "${base.env}"'
  );
}

export default Object.assign({}, base, overrides);
