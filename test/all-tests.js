var fs = require("fs");
var glob = require("glob");
var assert = require("assert");
var parser = require("../lib/hocon-parser");

exports["test unquoted key object string value"] = function () {
    var hocon = 'foo: "bar"';
    assert.deepEqual(parser.parse(hocon), {"foo":"bar"} );
};

exports["test unquoted key object number value"] = function () {
    var hocon = 'foo:3';
    assert.deepEqual(parser.parse(hocon), {"foo":3} );
};

exports["test object"] = function () {
    var hocon = '{"foo":"bar"}';
    assert.deepEqual(parser.parse(hocon), {"foo":"bar"} );
};

exports["test deep object"] = function () {
    var hocon = '{"foo":{"bar":"baz"}}';
    assert.deepEqual(parser.parse(hocon), {"foo":{"bar":"baz"}} );
};

exports["test array"] = function () {
    var hocon = '[1,2,3,4,5]';
    assert.deepEqual(parser.parse(hocon), [1,2,3,4,5] );
};

exports["test array trailing comma"] = function () {
    var hocon = '[1,2,3,4,5,]';
    assert.deepEqual(parser.parse(hocon), [1,2,3,4,5] );
};

exports["test array line separated"] = function () {
    var hocon = '[  1\n 2\n 3\n 4\n\t5  ]';
    assert.deepEqual(parser.parse(hocon), [1,2,3,4,5] );
};


exports["test deep object key sep 1"] = function () {
    var hocon = '{ foo= {"bar":"baz"} }';
    assert.deepEqual(parser.parse(hocon), {"foo":{"bar":"baz"}} );
};

exports["test deep object key sep 2"] = function () {
    var hocon = ' foo = {"bar":"baz"}';
    assert.deepEqual(parser.parse(hocon), {"foo":{"bar":"baz"}} );
};

exports["test deep object key sep 3"] = function () {
    var hocon = ' foo {bar:true}';
    assert.deepEqual(parser.parse(hocon), {"foo":{"bar":true}} );
};




if (require.main === module) {
//    require("test").run(exports);

	glob( 'test/**/*.config', function(err, files) {
		for( i in files ) {
			var f1 = files[i];
			fs.readFile( f1, 'utf8', function(err, config) {
				var f2 = f1.substr(0, f1.length - 7) + '.json';
				fs.readFile( f2, 'utf8', function(err, json) {
					exports['test config @ ' + f1] = function() {
						assert.deepEqual( parser.parse(config.trim()), JSON.parse(json) );
					};
    				require("test").run(exports);
				});
			});
		}
	});
}
