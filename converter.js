const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const EventEmitter = require('events');

class Converter extends EventEmitter {
  constructor() {
    super();
    this.on('start', (csvFile) => {
      this.convert(csvFile);
    });
  }

  convert(csvFile) {
    const converter = csv({toArrayString: true});
    let jBuff = '';
    converter
      .fromFile(csvFile)
      .on('data', (data) => {
        jBuff += data.toString('utf8');
      })
      .on('error', (error) => {
        console.error(`Error:\n ${error.message}`);
        this.emit('completed', error.message);
      })
      .on('end', () => {
        const dir = path.dirname(csvFile);
        fs.writeFileSync(path.join(dir, 'customer-data.json'), jBuff);
        console.log('done');
        this.emit('completed', null, 'Completed');
      });

  }

}

module.exports = Converter;
