const search = require('../index.js');

describe('min football', () => {
  it('using weather', () => {
    expect(search('weather')).toEqual('14');
  });
});

describe('nothing to nothing', () => {
  it('using football', () => {
    expect(search('football')).toEqual('Aston_Villa');
  });
});
