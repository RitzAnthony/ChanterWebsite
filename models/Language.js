var keystone = require('keystone');
var Types = keystone.Field.Types;
var localization = require('i18n');

/**
 * Language Model
 * ==========
 */


var Language = new keystone.List('Language', {
	map: {name: 'title'},
	autokey: {path: 'slug', from: 'title', unique: true},
});

Language.add({
	title: {type: String, required: true},
	abbreviation: {type: String},
});



Language.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Update navigation on page save
Language.schema.post('save', function () {
	console.log('Save Post');
	//updateNavigation();
});

Language.defaultColumns = 'title';
Language.register();



