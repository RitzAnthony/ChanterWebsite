
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
	
	hbs.registerHelper("format_date", function(value, options) {
		return value.toDateString();
	});



	hbs.registerHelper("address", function(president, options) {
		let html = '<address>';
	
		if(president.address1.length > 0)
			html += president.address1 + '<br />';
		
		if(president.address2.length > 0)
			html += president.address2 + '<br />';
		
		if(president.npa.length > 0 && president.locality.length > 0)
			html += president.npa + ' ' + president.locality + '<br />';
		
		if(president.email.length > 0)
			html += '<a href="mailto:'+president.email+'">'+president.email + '</a><br />';
		
		if(president.phone.length > 0)
			html += president.phone + '<br />';
		
		if(president.phone_pro.length > 0)
			html += president.phone_pro + '<br />';
		
		if(president.fax.length > 0)
			html += president.fax + '<br />';
		
		if(president.phone_mobile.length > 0)
			html += president.phone_mobile + '<br />';
		
		html += '</address>';
		return html;
	});

	// More helpers...
}

module.exports = hbsHelpers;
