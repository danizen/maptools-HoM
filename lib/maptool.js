var JSZip = require('jszip');

exports.convert = function(name, data, version = '1.6.1') {
	var output = "<net.rptools.maptool.model.LookupTable><entryList>";
	var last = 0;
	for (i = 0; i < data.length; i++){
		var tmp = data[i].trim().split('\t',2);
		var min=max=0;
		if (tmp[0].indexOf('-') > 0) { //is a range not a single value
			var itmp = tmp[0].split('-');//split up range
			min = itmp[0];
			max = itmp[1];
		} else {
			min=max=tmp[0];
		}
		output = output
			+ "<net.rptools.maptool.model.LookupTable_-LookupEntry>\n"
			+ "<min>"+min+"</min>\n"
			+ "<max>"+max+"</max>\n"
			+ "<value>"+tmp[1]+"</value>"
			+ "</net.rptools.maptool.model.LookupTable_-LookupEntry>";
		if( parseInt(max) > last)
			last=parseInt(max);
	}
	ouput = output
		+ '  </entryList>\n'
		+ '<name>'+name+'</name>\n'
		+ '<defaultRoll>1d'+last+'</defaultRoll>\n'
		+ '<visible>true</visible>\n'
		+ '<allowLookup>true</allowLookup>\n'
		+ '<pickOnce>false</pickOnce>\n'
		+ '</net.rptools.maptool.model.LookupTable>\n';
				
	//console.log(table);
	//document.getElementById("output").innerHTML = output;
	//document.getElementById("propoutput").innerHTML = 
	var properties =
		'<map>\n'
		+ '<entry>\n'
		+ '	<string>version</string>\n'
		+ '	<string>'+version+'</string>\n'
		+ '</entry>\n'
		+ '</map>\n';
	var zip = new JSZip();
	zip.file("properties.xml",properties);
	zip.file("content.xml",output);
	return zip.generateAsync({type: 'binarystring'});
}
