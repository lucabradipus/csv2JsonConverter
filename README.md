# csv2JsonConverter
Module 1 assignment lab in edX introduction to NodeJS 

**Installation**

  * Clone the repository
  * install the module with *npm i*
  * test with *node test.js*
  * run with *node customer-data-converter.js*
  
  
**Some explanation on my code**

*converter.js*:

  * In contructor defines the listener method for the *start* that calls the *convert* method receiving the name of the cvs file to be converted and the name of the json output file (by default 'customer-data.json')
  * convert creates a... converter provided by csvtojson, specifying the output must be an array of json objects then defines a buffer that will be used in the 'data' listener.
    * I used a listener on 'error' and another on 'end' instead that a 
    listener on 'done'. but anyway I was not able to figure out how to trigger the error 
    event in my tests
    * when 'error', it emits a 'completed' event with the error message'
    * when 'end', it gets the directory name from the csv file. attach it to the json 
    filename, writes the file and emit a 'completed' event as null as the first parameter 


*customer-data-converter.js*

  * Requires the Converter module defined converter.js. 
  * Instantiates a new converter object.
  * Defines converter.on('completed' method that simply write a message on the console
  * Emits a 'start' event for the converter object to begin the conversion
  * csv is  in the **data** directory. So the json file is also created there

*test.js*

I wrote a couple of test for my converter. 

To ease the testing is the main reason I used a module for the converter object.

test.js requires the assert module mainly because I don't yet know any test suite.

 I test two cases. 

  * The first is with a correct csv that must returns exactly 1000 json items
  * The second is with a csv that has only the header information and must return an empty array.

Inside test.js I add some comment to... justify my choices
csv files used for testing are in the **test-data** directory. converted json file is also created there


**final considerations**

In converter.js I defined a class that extends Emitter and allows me to emit a completed event.
Honestly, this was not my first choice. I thought that a simple script would be more than enough, without 
have to manage events, but when I wrote my test I realised that, due to the  event driven nature of the
csvtojson module I could not be sure of the completion of the conversion without emitting an event
More than this has I wite always the same file (customer-data.json) and I don't know what could happen if
two converter are working together, even if I am using fs.writeFileSync.

I choose to pretend that the csv files was already  downloaded "before" I begin to convert it. 
Specifications seemed to me ( a not native English speaker) not completely clear in this sense. 

## UPDATE (30/11/2017)
looking at the solution proposed by  banngass I updated two methods call to obtain 
a "formatted" json. The changed lines are marked in converted.js and are marked as 
"BY BANGASS". the json file has the same content, but the lines are now formatted to 
allow a simple diff with the json provided as solution. I
