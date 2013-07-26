
var noop = function () {};

var makeMockFn = function () {
  var mockFn = function () {
    this.callHistory.push(Array.prototype.slice.call(arguments, 0));
    this.callCount += 1;
    return this.implementation.apply(this, arguments);
  }.bind(mockFn);

  mockFn.implementation = noop;

  mockFn.returns = function (returned) {
    this.implementation = function () {
      return returned;
    };
  }.bind(mockFn);

  mockFn.callbackArgs = function (args) {
    this.implementation = function () {
      var cb = Array.prototype.slice.call(arguments, 0).pop();
      return cb.apply(this, args);
    };
  }.bind(mockFn);

  mockFn.reset = function () {
    this.callCount = 0;
    this.callHistory = [];
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
          newObj[prop] = quire(api[prop]);
        return newObj;
      }, {});
  } else { // not a fn, obj, or array
    return api;
  }
};
