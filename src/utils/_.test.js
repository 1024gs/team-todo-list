import _ from './_';

describe('_', () => {
  describe('def(x)', () => {
    it('returns false for undefined', () => {
      expect(_.def(undefined)).toBe(false);
    });
    it('returns false for undefined', () => {
      expect(_.def(void 0)).toBe(false);
    });
    it('returns true for every other value', () => {
      expect(_.def(false)).toBe(true);
      expect(_.def(null)).toBe(true);
      expect(_.def(NaN)).toBe(true);
      expect(_.def(0)).toBe(true);
      expect(_.def('')).toBe(true);
      expect(_.def({})).toBe(true);
      expect(_.def([])).toBe(true);
    });
  });

  describe('undef(x)', () => {
    it('returns true for undefined', () => {
      expect(_.undef(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.undef(void 0)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.undef(false)).toBe(false);
      expect(_.undef(null)).toBe(false);
      expect(_.undef(NaN)).toBe(false);
      expect(_.undef(0)).toBe(false);
      expect(_.undef('')).toBe(false);
      expect(_.undef({})).toBe(false);
      expect(_.undef([])).toBe(false);
    });
  });

  describe('always(x)', () => {
    it('returns a function that returns the object initially supplied', () => {
      let always42 = _.always(42);
      expect(always42()).toBe(42);
      expect(always42(10)).toBe(42);
      expect(always42(false)).toBe(42);
    });
  });

  describe('on(f, g)', () => {
    it('returns a function that takes (a, b) and composes as follow f(g(a), g(b)', () => {
      const add = (a, b) => a + b;
      const square = (x) => x * x;
      expect(_.on(add, square)(2, 4)).toBe(20);
      expect(_.on(add, square)(3, 5)).toBe(add(square(3), square(5)));
    });
  });

  describe('pipe(f1, f2, .., fn)', () => {
    it('is a variadic function', () => {
      expect(typeof _.pipe).toBe('function');
      expect(_.pipe.length).toBe(0);
    });

    it('performs left-to-right function composition', () => {
      //  f :: (String, Number?) -> ([Number] -> [Number])
      let f = _.pipe(
        (x) => x + 'a',
        (x) => x + 'b',
        (x) => x + 'c'
      );

      expect(f.length).toBe(1);
      expect(f('')).toBe('abc');
    });
  });

  describe('curry', () => {
    it('curries a single value', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12);
      expect(g(3, 6, 2)).toBe(15);
    });

    it('curries multiple values', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12, 3);
      expect(g(6, 2)).toBe(15);
      const h = f(12, 3, 6);
      expect(h(2)).toBe(15);
    });

    it('allows further currying of a curried function', () => {
      const f = _.curry((a, b, c, d) => (a + b * c) / d); // f(12, 3, 6, 2) == 15
      const g = f(12);
      expect(g(3, 6, 2)).toBe(15);

      const h = g(3);
      expect(h(6, 2)).toBe(15);
      expect(g(3, 6)(2)).toBe(15);
    });
  });

  describe('isNil(x)', () => {
    it('returns true for undefined', () => {
      expect(_.isNil(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.isNil(void 0)).toBe(true);
    });
    it('returns true for null', () => {
      expect(_.isNil(null)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isNil(false)).toBe(false);
      expect(_.isNil(true)).toBe(false);
      expect(_.isNil(NaN)).toBe(false);
      expect(_.isNil(new Date())).toBe(false);
      expect(_.isNil(/(?:.)/)).toBe(false);
      expect(_.isNil(0)).toBe(false);
      expect(_.isNil('')).toBe(false);
      expect(_.isNil([])).toBe(false);
      expect(_.isNil({})).toBe(false);
      expect(_.isNil(function() {})).toBe(false);
      expect(_.isNil(() => {})).toBe(false);
    });
  });

  describe('isArray(x)', () => {
    it('returns true for array only', () => {
      expect(_.isArray([])).toBe(true);
      expect(_.isArray([[]])).toBe(true);
      expect(_.isArray([1])).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isArray(false)).toBe(false);
      expect(_.isArray(true)).toBe(false);
      expect(_.isArray(null)).toBe(false);
      expect(_.isArray(NaN)).toBe(false);
      expect(_.isArray(new Date())).toBe(false);
      expect(_.isArray(/(?:.)/)).toBe(false);
      expect(_.isArray(0)).toBe(false);
      expect(_.isArray('')).toBe(false);
      expect(_.isArray({})).toBe(false);
      expect(_.isArray(function() {})).toBe(false);
      expect(_.isArray(() => {})).toBe(false);
    });
  });

  describe('isEmpty(xs)', () => {
    it('returns true if a list is empty', () => {
      expect(_.isEmpty([])).toBe(true);
      expect(_.isEmpty([1])).toBe(false);
    });
    it('returns true for empty string', () => {
      expect(_.isEmpty('')).toBe(true);
      expect(_.isEmpty(' ')).toBe(false);
    });
    it('throws for null and undefined', () => {
      expect(() => _.isEmpty(null)).toThrowError(TypeError);
      expect(() => _.isEmpty(undefined)).toThrowError(TypeError);
    });
  });

  describe('defaultTo(x, val)', () => {
    it('returns the default value if input is null, undefined or NaN', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1(null)).toBe(1);
      expect(defaultTo1(undefined)).toBe(1);
      expect(defaultTo1(NaN)).toBe(1);
    });

    it('returns the input value if it is not null/undefined', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('a real value')).toBe('a real value');
    });

    it('returns the input value even if it is considered falsy', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('')).toBe('');
      expect(defaultTo1(0)).toBe(0);
      expect(defaultTo1(false)).toBe(false);
      expect(defaultTo1([])).toEqual([]);
    });

    it('is curried', () => {
      expect(_.defaultTo(1, null)).toEqual(_.defaultTo(1)(null));
    });
  });

  describe('equals(a, b)', () => {
    it('returns true if values are qeual', () => {
      expect(_.equals(1, 1)).toBe(true);
      expect(_.equals(1, '1')).toBe(false);
      expect(_.equals('a', 'a')).toBe(true);
      expect(_.equals(undefined, undefined)).toBe(true);
    });
  });

  describe('equalsBy(f, a, b)', () => {
    it('returns true if f applied to a equals f applied to b', () => {
      const toUpperCase = (x) => x.toUpperCase();
      expect(_.equalsBy(toUpperCase, 'a', 'A')).toBe(true);
      expect(_.equalsBy(toUpperCase, 'a', 'b')).toBe(false);
    });
  });

  describe('max(a, b)', () => {
    it('returns the maximum value', () => {
      expect(_.max(1, 2)).toBe(2);
      expect(_.max(2, 1)).toBe(2);
    });
  });

  describe('random(min, max)', () => {
    it('returns a random number', () => {
      expect(_.random(0, 1000) === _.random(0, 1000)).toBe(false);
    });

    it('returns a random number between min and max', () => {
      const x = _.random(0, 9);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(9);
    });

    it('is lower and upper inclusive', () => {
      expect(_.random(0, 0)).toBe(0);
      expect(_.random(1, 1)).toBe(1);
    });
  });

  describe('head(xs)', () => {
    it('returns the first element of an ordered collection', () => {
      expect(_.head([1, 2, 3])).toBe(1);
      expect(_.head([2, 3])).toBe(2);
      expect(_.head([3])).toBe(3);
      expect(_.head([])).toBe(undefined);

      expect(_.head('abc')).toBe('a');
      expect(_.head('bc')).toBe('b');
      expect(_.head('c')).toBe('c');
    });
  });

  describe('tail(xs)', () => {
    it('returns all but the first element of an ordered collection', () => {
      expect(_.tail([1, 2, 3])).toEqual([2, 3]);
      expect(_.tail([2, 3])).toEqual([3]);
      expect(_.tail([3])).toEqual([]);
      expect(_.tail([])).toEqual([]);
    });
  });

  describe('length(xs)', () => {
    it('works on lists', () => {
      expect(_.length([1, 2, 3])).toBe(3);
      expect(_.length([])).toBe(0);
    });
    it('works on strings', () => {
      expect(_.length('abc')).toBe(3);
      expect(_.length('')).toBe(0);
    });
  });

  describe('push(x, xs)', () => {
    it('appends x to xs', () => {
      expect(_.push(2, [1])).toEqual([1, 2]);
      expect(_.push(2, [])).toEqual([2]);
    });
    it('is not destructive', () => {
      const xs = [1, 2];
      const res = _.push(3, xs);
      expect(xs).toEqual([1, 2]);
      expect(res).toEqual([1, 2, 3]);
      expect(res).not.toBe(xs);
    });
  });

  describe('copy(xs)', () => {
    it('clones shallow arrays', () => {
      let list = [1, 2, 3];
      let clone = _.copy(list);
      list.pop();

      expect(list).not.toBe(clone);
      expect(clone).toEqual([1, 2, 3]);
    });
  });

  describe('map(fn, xs)', () => {
    let times2 = (x) => x * 2;
    let add1 = (x) => x + 1;
    let dec = (x) => x - 1;
    let functor = (a, b, c) => {
      if (b || c) {
        throw new Error('the functor must be called only with one argument');
      }
      return a;
    };

    it('maps simple functions over arrays', () => {
      expect(_.map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    });

    it('returns empty array for an empty-array input', () => {
      expect(_.map(times2, [])).toEqual([]);
    });

    it('the functor is called only with one argument', () => {
      expect(_.map(functor, [0, 0, 0])).toEqual([0, 0, 0]);
    });

    it('is a curried function', () => {
      expect(_.map(add1)([1, 2, 3])).toEqual(_.map(add1, [1, 2, 3]));
    });
  });

  describe('prop(x, obj)', () => {
    it('returns a function that fetches the appropriate property', () => {
      expect(_.prop('name', {name: 'Fred', age: 23})).toBe('Fred');
      expect(_.prop('id', {x: 23, id: 1})).toBe(1);
    });

    it('is a curried function', () => {
      expect(_.prop('a', {a: 1})).toEqual(_.prop('a')({a: 1}));
    });
  });

  describe('removeBy(eq, x, xs)', () => {
    it('deletes x from xs if the eq predicate returns true', () => {
      expect(_.removeBy((a, b) => a === b, 2, [1, 2, 3])).toEqual([1, 3]);
      expect(_.removeBy((a, b) => a === b, 2, [1, 3, 4])).toEqual([1, 3, 4]);
    });

    it('returns an empty array if xs is empty', () => {
      expect(_.removeBy((a, b) => a === b, 2, [])).toEqual([]);
    });

    it('is not destructive', () => {
      const xs = [1, 2];
      const res = _.removeBy((a, b) => a === b, 3, xs);
      expect(res).toEqual([1, 2]);
      expect(xs).not.toBe(res);
    });

    it('is a curried function', () => {
      const eq = (a, b) => a == b;
      const x = 1;
      const xs = [1, 2];
      expect(_.removeBy(eq, x, xs)).toEqual(_.removeBy(eq)(x, xs));
      expect(_.removeBy(eq, x, xs)).toEqual(_.removeBy(eq, x)(xs));
    });
  });

  describe('update(fn, idx, xs)', () => {
    it('updates the element at index idx with whatever fn returns', () => {
      expect(_.update(() => 3, 1, [1, 2, 3])).toEqual([1, 3, 3]);
    });

    it('the function fn is called with element at index idx', () => {
      expect(_.update((element) => element + 5, 1, [1, 2, 3])).toEqual([1, 7, 3]);
    });

    it('returns an empty array if xs is empty', () => {
      expect(_.update(() => 3, 1, [])).toEqual([]);
    });

    it('returns xs if the idx is out of range', () => {
      expect(_.update(() => 3, 3, [1, 2, 3])).toEqual([1, 2, 3]);
      expect(_.update(() => 3, -1, [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('is not destructive', () => {
      const xs = [1, 2];
      const res = _.update(() => 2, 1, xs);
      expect(res).toEqual([1, 2]);
      expect(xs).not.toBe(res);
    });

    it('is a curried function', () => {
      const fn = () => 9;
      const idx = 1;
      const xs = [1, 2];
      expect(_.update(fn, idx, xs)).toEqual(_.update(fn)(idx, xs));
      expect(_.update(fn, idx, xs)).toEqual(_.update(fn, idx)(xs));
    });
  });

  describe('mergeAll([a, b, c])', () => {
    it('merges a list of objects', () => {
      let a = {a: 1};
      let b = {b: 2};
      let c = {c: 3};
      expect(_.mergeAll([a, b, c])).toEqual({a: 1, b: 2, c: 3});
    });
    it('overrides properties in the FIRST object', () => {
      let a = {w: 1, x: 2};
      let b = {w: 100, y: 3, z: 4};
      expect(_.mergeAll([a, b])).toEqual({w: 100, x: 2, y: 3, z: 4});
    });
    it('is not destructive', () => {
      let a = {w: 1, x: 2};
      let res = _.mergeAll([a, {x: 5}]);
      expect(a).not.toBe(res);
      expect(res).toEqual({w: 1, x: 5});
    });
  });
});

describe('clone(obj)', () => {
  it('clones shallow object', () => {
    let obj = {a: 1, b: 'x', c: true};
    let clone = _.clone(obj);
    obj.a = 2;
    obj.b = 'y';
    obj.c = false;
    expect(clone).toEqual({a: 1, b: 'x', c: true});
  });
  it('copies objects and arrays by reference', () => {
    let obj1 = {a: 1};
    let obj2 = [1, 2];
    let obj3 = new Date(2013, 11, 31);
    let obj = {a: obj1, b: obj2, c: obj3};

    let clone = _.clone(obj);

    expect(obj.a).toBe(clone.a);
    expect(obj.b).toBe(clone.b);
    expect(obj.c).toBe(clone.c);
  });
  it('copies function by reference', () => {
    let fn = function(x) {
      return x + x;
    }; // eslint-disable-line
    let obj = {a: fn};

    let clone = _.clone(obj);

    expect(clone.a(2)).toBe(4);
    expect(obj.a).toBe(clone.a);
  });
});

describe('assoc(prop, val, obj)', () => {
  /* eslint-disable max-len, block-spacing, brace-style */
  it('makes a shallow clone of an object, overriding only the specified property', () => {
    let obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    let obj2 = _.assoc('e', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(obj1.b);
    expect(obj2.f).toBe(obj1.f);
  });
  it('is the equivalent of clone and set if the property is not on the original', () => {
    let obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    let obj2 = _.assoc('z', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(obj1.b);
    expect(obj2.f).toBe(obj1.f);
  });
  /* eslint-enable */
});

describe('randomStr(length)', () => {
  it('returns a random string', () => {
    expect(_.randomStr(3) === _.randomStr(3)).toBe(false);
  });
  it('returns a random string of the given length', () => {
    expect(_.randomStr(3).length).toBe(3);
  });
});
