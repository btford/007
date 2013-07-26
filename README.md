# 007
[![Build Status](https://travis-ci.org/btford/007.png?branch=master)](https://travis-ci.org/btford/007)

Returns a deep copy of an object with all functions converted to spies.

## Install

Install with `npm`:

```
npm install 007
```

## Example

```
// we want to test github
var github = require('github');
var doubleOhSeven = require('007');
var mockGithub = doubleOhSeven(github);

mockGithub.pullRequests.getCommits.returns = function () {
  return {
    foo: 'beep'
  };
};

assert(mockGithub.pullRequests.getCommits('lalala').foo === 'beep');
assert(mockGithub.pullRequests.getCommits.callCount === 1);

```

## API

### `doubleOhSeven()`

Takes an object or function as an argument, returns a function or object matching the original, but with mocked out functions.

### `mockFn.implementation`

The implementation of the mock function.
Set with `=`:

Ex:
```
mockFn.implementation = function (val, cb) {
  return cb(val + 1);
};
```

The following functions are helpers for implementation; using them will override `mockFn.implementation`.

#### `mockFn.returns()`

The return value of the mock.

Ex:
```
mockFn.returns('foo');
mockFn(function (arg) {
  console.log(arg); // outputs 'foo'
});
```

#### `mockFn.callbackArgs()`

The callback args to be invoked by the mock.

Ex:
```
mockFn.callbackArgs(['foo']);
mockFn(function (arg) {
  console.log(arg); // outputs 'foo'
});
```

## License
MIT
