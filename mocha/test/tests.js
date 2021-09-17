const assert = require('assert');

describe('simple tests', () => {
  it('should return an array', (done) => {
    assert(Array.isArray('a,b,c'.split(',')));
    done();
  });
  it('should return the same array', (done) => {
    assert.equal(['a','b','c'].length, 'a,b,c'.split(',').length,
                 'arrays have equal length');
    done();
  });
});
