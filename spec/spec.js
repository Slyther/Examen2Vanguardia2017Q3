const search = require('../index.js');

describe('cat to dog', () => {
  it('using []', () => {
    expect(search('cat', 'dog', [])).toEqual(['cat', 'dat', 'dot', 'dog']);
  });
});

describe('nothing to nothing', () => {
  it('using emoty quotes', () => {
    expect(search('', '', [])).toEqual(['']);
  });
});
