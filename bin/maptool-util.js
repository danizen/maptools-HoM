#!/usr/bin/env node

const fs = require('fs');
const maptool = require('../lib/maptool');
const { program } = require('commander');

// Setup command-line processing
program.version('0.0.1');
program
	.option('-d, --debug', 'output extra debugging options')
	.option('-v, --maptool-version', 'version for maptool properties.xml');

// Usage
function usage() {
	process.stderr.write('maptool-util [-d] [-v version] <tablename> <path>\n');
	process.exit(1);
}

// main
program.parse(process.argv);
if (program.debug)
	console.log(program.opts());
if (program.args.length != 2)
	usage();
[name, path] = program.args

if (program.debug)
	console.log('write '+path+' to '+name);

try {
    var data = fs.readFileSync(path, 'utf8');
    maptool.convert(name, data, 'binarystring').then(
    	function(content) {
	    	fs.writeFileSync(name+'.mttable', content, 'binary');
    	}
    ).catch(function(e) {
    	console.log('Error writing file', e.stack);
    });
} catch(e) {
    console.log('Error:', e.stack);
}
