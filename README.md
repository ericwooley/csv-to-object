csv-to-object
==========

transform a (c)sv file into a javascript object.

You can use a dilemeter and a text qualifier.

Example Usage
-------------
first use `npm install csv-to-object --save` then:


```
var csvToObject = require('csv-to-object');
var testString = [
	'h1|h2|h3|h4', // The first line will be the headers
	'value 1|"Value 2"|value 3|"value - 5"'// This is the first row of data
];
// If you want to use a string
csvToObject({
	dilemeter: '|',
	textQualifier: '"',
	string: testString.join('\n')
});
// If you want to use a file
csvToObject({
	dilemeter: '|',
	textQualifier: '"',
	filename: 'my.csv.file.csv'
});
```