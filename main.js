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
	// This is the ultimate split, which would countain a dilimeter wrapped in text qualifiers
	var searchArray = [
		tq+d+tq, // First case to search for, eg: ","
		tq+d, // Second case to search for, eg: ",
		d+tq, // Third case to search for, eg: ,"
		d, // Last case to search for, eg: ,
		// '\\n'
	];
	var regexString = "("+searchArray.join('|')+')';
	var regex = new RegExp(regexString);
	if(settings.filename.length > 0)
		settings.string = readFile(settings.filename);
	var splitContents = settings.string.split('\n');
	var parsedContents = [];
	for (var i = 0; i < splitContents.length; i++) {
		// console.log("");
		// console.log(splitContents[i]);
		parsedContents.push(splitContents[i].split(regex));

	};
	console.log(parsedContents);

}
function escapeForRegex(str){
	 return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function readFile(filename){
	return fs.readFileSync('./scripts/'+filename);
}

module.exports = svToObject;
if(require.main === module) {
	var testString = [
"ProductName| ProductCode|ProductDescription| PricingLine| ProductFamily| PartCatagory| ProductLine| UnitOfMeasure| RecommendedSpare| RMAFORMViewable (yes/no)| NorthAmericanStandardWarranty|GlobalStandardWarranty|TotalWarranty| ExtWarrantyEldigable (true/false)| WarrantCatagory| AdvanceExchangeElidgable (true/false)|CapElidgable(true/false)|Active(true/false)|quotable (true/false)|accessableBy|DomesticPrice|InternationalPrice|standardCost",
"100-01296|Aztek RT Install Kit|Aztek RT Install Kit|Third Party|Third Party|Aztek|Gateway|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No",
"100-03647|E3-48 100Pr CAT5 Cable with Intgratd/ RMT PWR 50'|E3-48 100Pr CAT5, 4RJ21->Unterm, 50ft, dead pr provides rmt pwr, above Grade|E3|E-Series|Cables|E-Series EM|Each|0|False|90 Days|None|90 Days|False|None|False|False|True|False|All|0|0|0||Yes",
"100-01497|ODC PON Splitter Kit Installation Guide|ODC PON Splitter Kit Installation Guide|C7|C-Series|Documentation|C7-Other|Each|0|False|None|1 Year|4 Years|False|None|False|False|True|False|All|0|0|0||No",
"100-03521|\"Pre-Assm E3-48 AC MS2 Abv grade/5' Cabl Clped\"|\"Pre-Assm E3-48 AC Powered Unit with MS2 Connectors-Above Grade 5ft cabling w/Coolped mount\"|E3|\"E-Series\"|DSL Units|E3|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No",
"100-03522|Pre-Assm E3-48 AC 710 Abv grade/5' Cabl Clped|Pre-Assm E3-48 AC Powered Unit with 710 Connectors-Above Grade 5ft cabling w/Coolped mount|E3|E-Series|DSL Units|E3|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No",
"100-03523|Pre-Assm E3-48 AC MS2 Abv grade/20' Cabl|Pre-Assm E3-48 AC Powered Unit with MS2 Connectors-Above Grade 20ft cabling|E3|E-Series|DSL Units|E3|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No",
"100-03524|Pre-Assm E3-48 AC 710 Abv grade/20' Cabl|Pre-Assm E3-48 AC Powered Unit with 710 Connectors-Above Grade 20ft cabling|E3|E-Series|DSL Units|E3|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No",
"100-03525|Pre-Assm E3-48 LP MS2 Abv grade/5' Cabl Clped|Pre-Assm E3-48 Line Powered Unit with MS2 Connectors - Above Grade 5 ft cabling w/Coolped mount|E3|E-Series|DSL Units|E3|Each|0|False|None|None|None|False|None|False|False|True|False|All|0|0|0||No"];
svToObject({
	dilemeter: '|',
	textQualifier: "\"",
	string: testString.join('\n')
});
} else {
	console.log("required as a module"); 
}