const fs = require('fs');

const weather = fs.readFileSync('weather.dat')
  .toString();

const weatherPattern = /^\d+,\d+,\d+/;

const football = fs.readFileSync('football.dat')
  .toString();

const footballPattern = /^\d+.,\w+,\d+,\d+,\d+,\d+,\d+,\d+,\d+/;

function munge(rawData, pattern) {
  let raw = rawData.replace(/-+/g, '')
    .replace(/\*+/g, '')
    .replace(/ +\n/g, '\n')
    .replace(/ +/g, ',')
    .split('\n')
    .map(x => x.slice(1));
  raw = raw.filter(x => x.match(pattern));
  console.log(raw);
  raw = raw.map(lineArray => lineArray.split(','));
  return raw;
}

function minDiff(data, cmp1, cmp2, toReturn) {
  let dat = data.map((element, i) => {
    const el = element;
    el.Diff = Math.abs(Number(data[i][cmp1]) - Number(data[i][cmp2]));
    return el;
  });
  dat = dat.sort((a, b) => a.Diff - b.Diff);
  return dat[0][toReturn];
}

module.exports = function dataMunging(input) {
  // return munge(data);
  const data = input === 'weather' ? weather : football;
  const pattern = input === 'weather' ? weatherPattern : footballPattern;
  const cmp1 = input === 'weather' ? 2 : 6;
  const cmp2 = input === 'weather' ? 3 : 7;
  const toReturn = input === 'weather' ? 0 : 1;
  console.log('Data: \n', data);
  console.log(minDiff(munge(data, pattern), cmp1, cmp2, toReturn));
};

// process.argv[2] = 'weather';
// const data = process.argv[2] === 'weather' ? weather : football;
// const pattern = process.argv[2] === 'weather' ? weatherPattern : footballPattern;
// console.log('Data: \n', data);
// console.log(minDiff(munge(data, pattern), 6, 7, 1));
