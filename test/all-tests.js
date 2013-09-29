var fs = require("fs");
var glob = require("glob");
var assert = require("assert");
var config = require("../lib/hocon-config");

if (require.main === module) {

	glob( 'test/**/*.config', function(err, files) {

		var exports = {};
		for( i in files ) {

			var f1 = files[i];
			var f2 = f1.substr(0, f1.length - 7) + '.json';

			var hocon = fs.readFileSync( f1, 'utf8');
			var json = fs.readFileSync( f2, 'utf8');

			exports['testing @ ' + f1] = function() {
				assert.deepEqual( config.parse(hocon), JSON.parse(json) );
			}

		}

		require("test").run(exports);
	});
}
