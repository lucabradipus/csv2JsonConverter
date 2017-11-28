fs = require('fs');
path = require('path');
const assert = require('assert');

Converter = require('./converter');

const dataDir = path.join(__dirname, 'data')
let csvFile = path.join(dataDir, 'customer-data.csv');
const jsonFile = path.join(dataDir, 'customer-data.json');
const converter = new Converter();
converter.on('completed', (error, completed) => {
  if (error) return console.error(`error in conevrting csv file: ${error}`);

  console.log('csv file converted');

});
converter.emit('start', csvFile);

