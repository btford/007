var should = require('should');
var doubleOhSeven = require('../007.js');


describe('007', function () {
  it('should work on functions', function () {
    doubleOhSeven(function () {}).should.have.property('implementation');
  });
});
