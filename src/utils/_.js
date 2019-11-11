/**
 * HOISTED
 */
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const concat = (b, a) => a.concat(b);

/**
 * Composition
 */
const always = (x) => () => x;
const on = (f, g) => (a, b) => f(g(a), g(b));
const pipe = (...fns) => (init) => fns.reduce((a, fn) => fn(a), init);
const curry = (fn, a = []) => (...b) => {
  const args = concat(b, a);
  if (args.length < fn.length) {
    return curry(fn, args);
  }
  return fn(...args);
};

/**
 * Boolean
 */
const isNil = (x) => undef(x) || x === null;
const isArray = (x) => Array.isArray(x);
const isEmpty = (xs) => xs.length === 0;
/* eslint-disable-next-line no-self-compare */
const defaultTo = (x, val) => (isNil(val) || val !== val ? x : val);
const equals = (a, b) => a === b;
const equalsBy = (f, a, b) => equals(f(a), f(b));

/**
 * Math
 */
const max = (a, b) => Math.max(a, b);
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Lists
 */
const head = (xs) => xs[0];
const tail = (xs) => xs.slice(1, xs.length);
const length = (xs) => xs.length;
const copy = (xs) => xs.slice(0, xs.length);
const push = (b, a) => a.concat([b]);
const map = (fn, xs) => xs.map((x) => fn(x));
const removeBy = (eq, x, xs) => {
  const r = [];
  let i = 0;
  while (i < xs.length) {
    if (!eq(x, xs[i])) {
      r.push(xs[i]);
    }
    i += 1;
  }
  return r;
};
const update = (fn, idx, xs) => {
  if (xs.length === 0) {
    return [];
  }
  if (idx >= xs.length || idx < 0) {
    return xs;
  }

  const r = copy(xs);
  r[idx] = fn(xs[idx]);

  return r;
};

/**
 * Objects
 */
const prop = (x, obj) => obj[x];
const clone = (obj) => Object.assign({}, obj);
const mergeAll = (objs) => Object.assign({}, ...objs);
const assoc = (prop, val, obj) => {
  const r = clone(obj);
  r[prop] = val;
  return r;
};

/**
 * custom functions
 */
const randomStr = (length) => {
  let r = [];
  let i = 0;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (i < length) {
    r[i] = possible.charAt(random(0, possible.length - 1));
    i += 1;
  }
  return r.join('');
};

const _ = {
  def,
  undef,

  always,
  on: curry(on),
  pipe,
  curry,

  isNil,
  isArray,
  isEmpty,
  defaultTo: curry(defaultTo),
  equals: curry(equals),
  equalsBy: curry(equalsBy),

  max: curry(max),
  random: curry(random),

  head,
  tail,
  length,
  copy: copy,
  concat: curry(concat),
  push: curry(push),
  map: curry(map),
  removeBy: curry(removeBy),
  update: curry(update),

  prop: curry(prop),
  clone: clone,
  assoc: curry(assoc),
  mergeAll,

  randomStr: randomStr
};

export default _;
