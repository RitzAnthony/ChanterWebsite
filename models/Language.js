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

//TODO 
function updateNavigation() {
	Language.model.find({
	}, function(err, languages) {
		console.log(languages.length);
		languages.forEach(function(page, i) {
			var navPoint = {label: page.title, key: page.title.toLowerCase(), href: '/languages/page/'+page.title.toLowerCase()};
			var navLink = keystone.get('navigation');

			navLink.push(navPoint);
		});
	});
}

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

updateNavigation();
