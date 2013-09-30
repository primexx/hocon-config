var fs = require("fs");
var glob = require("glob");
var assert = require("assert");
var config = require("../lib/hocon-config");



var assertParseEquals = function( hoconFile, jsonFile ) {

	var hocon = fs.readFileSync( hoconFile, 'utf8');
	var json = fs.readFileSync( jsonFile, 'utf8');

//	console.log( "HOCON ", config.parse(hocon));
//	console.log( "JSON ", JSON.parse(json));
	
	assert.deepEqual( config.parse(hocon), JSON.parse(json) );

}

exports["test document parses with comments"] = function() {
	assertParseEquals( 'test/success/comments-1.config',
	                   'test/success/comments-1.json' );
};

exports["test array parses"] = function() {
	assertParseEquals( 'test/success/array-1.config',
	                   'test/success/array-1.json' );
};

exports["test array parses with no separator"] = function() {
	assertParseEquals( 'test/success/array-2.config',
	                   'test/success/array-2.json' );
};

exports["test dup key object merge"] = function() {
	assertParseEquals( 'test/success/dup-key-object-merge.config',
	                   'test/success/dup-key-object-merge.json' );
};

if (require.main === module) {
	require('test').run(exports);
}
