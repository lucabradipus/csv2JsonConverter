const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const EventEmitter = require('events');

class Converter extends EventEmitter {
  constructor() {
    super();
    this.on('start', (csvFile, jsonFilename='customer-data.json') => {
      this.convert(csvFile, jsonFilename);
    });
  }

  convert(csvFile, jsonFilename) {
    const converter = csv({toArrayString: true});
    let jBuff = [];
    //    let jBuff = '';
    converter
      .fromFile(csvFile)
      .on('json', (jsonObj) => {   // .on('data', (data) => { //BY BANGASS
        jBuff.push(jsonObj);       //   jBuff += data.toString('utf8'); //BY BANGASS
      })                           // }) //BY BANGASS
      .on('error', (error) => {
        console.error(`Error:\n ${error.message}`);
        this.emit('completed', error.message);
      })
      .on('end', () => {
        const dir = path.dirname(csvFile);
        // fs.writeFileSync(path.join(dir, jsonFilename), jBuff); //BY BANGASS
        fs.writeFileSync(path.join(dir, jsonFilename), JSON.stringify(jBuff, undefined, 2), {encoding:"utf-8"}, (err) =>{ //BY BANGASS
          if(err) console.log("Error writing JSON-file: ", err); //BY BANGASS
        }); //BY BANGASS
        console.log('done');
        this.emit('completed', null, 'Completed');
      });

  }

}

module.exports = Converter;
