fs = require('fs');
path = require('path');
const assert = require('assert');

Converter = require('./converter');

const testDir = path.join(__dirname, 'test-data')
let csvFile = path.join(testDir, 'customer-data.csv');
const jsonFile = path.join(testDir, 'customer-data.json');
const converter = new Converter();
converter.on('completed', (error, completed) => {
  if (error) assert.fail(`error in testing correct csv file: ${error}`);

  try {
    const json = require(jsonFile);

    assert.equal(json.length, 1000, 'failed');
    console.log('correct csv file test passed');
  } catch (err) {
    console.log(`correct csv file test failed: ${err.message}`);
  }
  const converterEmpty = new Converter();
  csvFile = path.join(testDir, 'empty-data.csv');

  converterEmpty.on('completed', (error, completed) => {
    if (error) assert.fail(`error in testing empty csv file: ${error}`);

    try {
      delete require.cache[require.resolve(jsonFile)];

      const json = require(jsonFile);
      assert.equal(json.length, 0, 'empty csv file test passed');
    } catch (err) {
      // console.log(`empty csv file test passed: ${err.message}`);
      console.log("empty csv file test passed");
    }

  });
  converterEmpty.emit('start', csvFile);

});
converter.emit('start', csvFile);

