
var __ = require('./index').__;

function hbsHelpers(hbs) {
	hbs.registerHelper("__", function(value, options) {
		return __(value);
	});

	// More helpers...
}

module.exports = hbsHelpers;
