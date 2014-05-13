csv-to-object
==========

transform a (c)sv file into a javascript object.

You can use a dilemeter and a text qualifier.

Example Usage
-------------
```
var testString = [
	'h1|h2|h3|h4', // The first line will be the headers
	'value 1|"Value 2"|value 3|"value - 5"'// This is the first row of data
];
csvToObject({
	dilemeter: '|',
	textQualifier: '"',
	string: testString.join('\n')
});
```