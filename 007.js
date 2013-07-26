
var noop = function () {};

var makeMockFn = function () {
  var mockFn = function () {
    console.log(mockFn);
    mockFn.callHistory.push(Array.prototype.slice.call(arguments, 0));
    mockFn.callCount += 1;
    return mockFn.implementation.apply(this, arguments);
  };

  mockFn.implementation = noop;

  mockFn.returns = function (returned) {
    mockFn.implementation = function () {
      return returned;
    };
  }.bind(mockFn);

  mockFn.callbackArgs = function (args) {
    mockFn.implementation = function () {
      var cb = Array.prototype.slice.call(arguments, 0).pop();
      return cb.apply(this, args);
    };
  }.bind(mockFn);

  mockFn.reset = function () {
    mockFn.callCount = 0;
    mockFn.callHistory = [];
  }.bind(mockFn);

  mockFn.reset();

  return mockFn;
};

module.exports = function doubleOhSeven (api) {
  if (typeof api === 'function') {
    return makeMockFn();
  } else if (api instanceof Array) {
    return api.map(doubleOhSeven);
  } else if (api !== null && typeof api === 'object') {
    return Object.keys(api).
      reduce(function (newObj, prop) {
          newObj[prop] = doubleOhSeven(api[prop]);
        return newObj;
      }, {});
  } else { // not a fn, obj, or array
    return api;
  }
};
