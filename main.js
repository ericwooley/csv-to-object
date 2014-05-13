var _= require('underscore');
var fs = require('fs');
function csvToObject(settings){
	_.defaults(settings, {
		dilemeter: ',',
		textQualifier: '',
		filename: '',
		string: ''
	});

	settings.dilemeter = escapeForRegex(settings.dilemeter);
	settings.textQualifier = escapeForRegex(settings.textQualifier);
	var d = settings.dilemeter;
	var tq = settings.textQualifier;
	var searchArray = [
		"(?:"+tq+d+tq+")", // First case to search for, eg: ","
		"(?:"+tq+d+")", // Second case to search for, eg: ",
		"(?:"+d+tq+")", // Third case to search for, eg: ,"
		"(?:"+d+")", // Last case to search for, eg: ,
		"(?:"+tq+"$)", // if the text qualifier is the very last thing
	];
	// collapse the search array down to a regular expression
	var regexString = "(?:"+searchArray.join('|')+')';
	var regex = new RegExp(regexString);
	// If a filename was supplied, use that as the string.
	if(settings.filename.length > 0)
		settings.string = readFile(settings.filename);

	// We want to analyze by line.
	var splitContents = settings.string.split('\n');

	// create an array of arrays containing the lines which have been split by the delemter
	var parsedContents = [];
	for (var i = 0; i < splitContents.length; i++) {
		parsedContents.push(splitContents[i].split(regex));
	};

	// The headers are the first line of the csv file
	var headers = parsedContents[0];

	// Build the final array to return which will contain objects 
	// mapped to the parts of the data by the header
	var returnArray = [];
	for (var i = 1; i < parsedContents.length; i++) {
		var line = parsedContents[i];
		var lineObject = {};
		for (var j = 0; j < line.length; j++) {
			if(typeof headers[j] === 'string' && headers[j].length > 0)
				lineObject[headers[j]] = line[j];
		};
		returnArray.push(lineObject);
	};
	return returnArray;
}
function escapeForRegex(str){
	 return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function readFile(filename){
	return fs.readFileSync(filename).toString();
}

module.exports = csvToObject;

// This is for testing.
if(require.main === module) {
	var testString = [
		'h1|h2|h3|h4', // The first line will be the headers
		'value 1|"Value 2"|value 3|"value - 4"',// This is the first row of data
		'value 1|"Value 2"|value 3|"value - 4"',// This is the first row of data
		'value 1|"Value 2"|value 3|"value - 4"'// This is the first row of data
	];
	var t = csvToObject({
		dilemeter: '|',
		textQualifier: '"',
		string: testString.join('\n')
	})
	if(!(t[0]['h1'] == 'value 1' && t[1]['h2'] == 'Value 2' && t[2]['h3'] == 'value 3' && t[1]['h4'] == 'value - 4'))
		throw new Error("incorrect results");
	else
		console.log("Passed!")

}