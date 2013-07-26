var should = require('should');
var doubleOhSeven = require('../007.js');


describe('007', function () {
  it('should work on functions', function () {
    doubleOhSeven(function () {}).should.have.property('implementation');
  });

  it('should work on objects', function () {
    doubleOhSeven({ foo: function () {} }).foo.should.have.property('implementation');
  });

  it('should work with objects with circular references', function () {
    var circle = {
      foo: function () {}
    };
    circle.bar = circle;
    var instr = doubleOhSeven(circle);
    instr.should.have.property('foo');
    instr.should.have.property('bar');
    instr.foo.should.eql(instr.bar.foo);
    instr.should.eql(instr.bar);
  });
});
