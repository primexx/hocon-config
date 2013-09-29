module.exports = function(grunt) {

	// A very basic default task.
	grunt.registerTask('default', 'DEF', function() {
		grunt.log.write('JISON ');
		grunt.log.ok();
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			build_jison: {
				command: 'jison ./src/hocon-parser.y ./src/hocon-parser.l -o ./lib/hocon-parser.js -m commonjs'
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');

};
