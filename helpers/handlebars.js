
var __ = require('./index').__;
var mongoose = require('mongoose');

function hbsHelpers(hbs) {
	hbs.registerHelper("__", function(value, options) {
		return __(value);
	});


	hbs.registerHelper("in_group", function(groupId, userGroups, options) {

		if(userGroups.indexOf(groupId) !== -1){
			return options.fn(this);
		}  
		
		return options.inverse(this);
	});
	
	hbs.registerHelper("selected", function(value, resLocals){
		if(typeof resLocals === 'undefined')
			return '';
		
		if(mongoose.Types.ObjectId.isValid(value))
			return value.equals(resLocals) ? 'selected' : '';

		return value == resLocals ? 'selected' : '';
	});

	// More helpers...
}

module.exports = hbsHelpers;
