fs = require('fs');
path = require('path');
const assert = require('assert');
//import class defined in convertr.js
Converter = require('./converter');

const testDir = path.join(__dirname, 'test-data');
let csvFile = path.join(testDir, 'customer-data.csv');
const jsonFile = path.join(testDir, 'customer-data.json');
//create a new Converter object
const converter = new Converter();
//when converter emit the completed event we test the result
converter.on('completed', (error, completed) => {
  if (error) assert.fail(`error in testing correct csv file: ${error}`);

  const json = require(jsonFile);

  // this is the correct file so I expect 1000 lines
  //if not assert throw an error and writes the message 'correct csv file test failed'
  assert.equal(json.length, 1000, 'correct csv file test failed');
  console.log('correct csv file test passed');

  //now I must create a new object because I have to execute the second test after the first has emitted a completed event
  // that because converter writes always the same file so I can't start a second test until I am sure the first finished
  // If I shouldreuse the first converter object the completed event will alway be triggered by the above
  // converter.on('completed...) method
  const converterWrong = new Converter();
  csvFile = path.join(testDir, 'wrong-data.csv');

  converterWrong.on('completed', (error, completed) => {
    if (error) assert.fail(`error in testing empty csv file: ${error}`);

    delete require.cache[require.resolve(jsonFile)];
    const json = require(jsonFile);
    assert.equal(json.length, 0, 'wrong csv file test failed');
    console.log('wrong csv file test passed');

  });
  //this starts the second conversion
  converterWrong.emit('start', csvFile);

});
//this starts the second conversion
converter.emit('start', csvFile);

