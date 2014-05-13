var _= require('underscore');
var fs = require('fs');
function svToObject(settings){
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

	///////////////////////////////////////////////////////////////
	/// This appears to be glitched
	///////////////////////////////////////////////////////////////
	var searchArray = [
		"(?:"+tq+d+tq+")", // First case to search for, eg: ","
		"(?:"+tq+d+")", // Second case to search for, eg: ",
		"(?:"+d+tq+")", // Third case to search for, eg: ,"
		"(?:"+d+")", // Last case to search for, eg: ,
		"(?:"+tq+"$)", // if the text qualifier is the very last thing
	];
	var regexString = "(?:"+searchArray.join('|')+')';
	console.log(regexString)
	var regex = new RegExp(regexString);


	if(settings.filename.length > 0)
		settings.string = readFile(settings.filename);
	var splitContents = settings.string.split('\n');
	var parsedContents = [];
	for (var i = 0; i < splitContents.length; i++) {
		// console.log("");
		console.log(splitContents[i]);
		parsedContents.push(splitContents[i].split(regex));
	};
	// console.log(parsedContents[1])

	var headers = parsedContents[0];
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
	return fs.readFileSync('./scripts/'+filename);
}
function processString(string, d, tq){


	
	return string.split(regex);

	// The simpleton way
	// var splitArray = string.split(tq+d+tq);
	// var str = string.split(tq+d+tq); // First case to search for, eg: ","
	// 	str = str.split(tq+d); // Second case to search for, eg: ",
	// 	str = str.split(d+tq); // Third case to search for, eg: ,"
	// 	str = str.split(d); // Last case to search for, eg: ,
	// 	str = str.split(tq); // if the text qualifier is the very last thing

	// return str;
}

module.exports = svToObject;


if(require.main === module) {
	var testString = [
		'h1|h2|h3|h4', // The first line will be the headers
		'value 1|"Value 2"|value 3|"value - 4"'// This is the first row of data
	];
	console.log(svToObject({
		dilemeter: '|',
		textQualifier: '"',
		string: testString.join('\n')
	}));
} else {
	console.log("required as a module"); 
}