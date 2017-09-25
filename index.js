const fs = require('fs');

const weather = fs.readFileSync('weather.dat')
  .toString();

const weatherPattern = /\w+,\d+,\d+,\d+,\d+,\d+,\d+,\d+/;

const football = fs.readFileSync('football.dat')
  .toString();

const footballPattern = /\d+,\w+,\d+,\d+,\d+,\d+,\d+,\d+,\d+/;

function munge(rawData, pattern) {
  const raw = rawData.replace(/\. +/g, ',')
    .replace(/-+/g, '')
    .replace(/ +\n/g, '\n')
    .replace(/ +/g, ',')
    .split('\n')
    .filter(x => x.match(pattern))
    .map(x => x.slice(1))
    .map(lineArray => lineArray.split(','));
  return raw;
}

function minDiff(data, cmp1, cmp2, toReturn) {
  let dat = data.map((element, i) => {
    const el = element;
    el.Diff = Math.abs(data[i][cmp1] - data[i][cmp2]);
    return el;
  });
  dat = dat.sort((a, b) => a.Diff - b.Diff);
  return dat[0][toReturn];
}

module.exports = function dataMunging(data) {
  return munge(data);
};
// process.argv[2] = 'weather';
const data = process.argv[2] === 'weather' ? weather : football;
const pattern = process.argv[2] === 'weather' ? weatherPattern : footballPattern;
console.log('Data: \n', data);
console.log(minDiff(munge(data, pattern), 6, 7, 1));
