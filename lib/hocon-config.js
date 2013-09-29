var Parser = require('./hocon-parser').Parser;

module.exports.parse = function(source) {
	var parser = new Parser();
	var obj = parser.parse(source.trim());
	console.log('INPUT ' + source);
//	console.log('OBJ ', obj);
	return obj;
}

module.exports.config = function(file) {
	
}
