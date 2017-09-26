#! /usr/bin/env node
const munger = require('../index.js');

const result = munger(process.argv[2]);
console.log(result);
