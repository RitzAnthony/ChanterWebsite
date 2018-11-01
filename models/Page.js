var keystone = require('keystone');
var Types = keystone.Field.Types;
var languageList = keystone.list('Language');

/**
 * Page Model
 * ========
 */


var Page = new keystone.List('Page', {
	map: {name: 'title'},
	autokey: {path: 'slug', from: 'title', unique: true},
});

Page.add({
	title: {type: String, required: true},
	isIndexPage: {type: Types.Boolean, default: false}, 
	language: {type: Types.Relationship, ref: 'Language'},
	foreignPage: {type: Types.Relationship, ref: 'Page'},
	state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
	image: {type: Types.CloudinaryImage},
	inNavigation: {type: Types.Boolean},
	content: {
		brief: {type: Types.Html, wysiwyg: true, height: 150},
		extended: {type: Types.Html, wysiwyg: true, height: 400},
	},
});


function updateNavigation() {
	keystone.set('navigation', []);
	Page.model.find({
		state: 'published',
		inNavigation: true,
	}, function(err, pages) {
		console.log(pages.length);
		pages.forEach(function(page, i) {
			Page.model.findById(page.foreignPage).exec(function(err, foreignPage) {
				languageList.model.findById(page.language).exec(
					function(err, language) {
						var foreignUrl = (foreignPage != undefined)? 
							'/'+foreignPage.slug.toLowerCase().replace(" ","") : '/';
						
						var url = (page.isIndexPage) ? '/' :  '/'+page.slug.toLowerCase().replace(" ","");
						
						var navPoint = {
							label: page.title,
							key: page.slug,
							href: url,
							language: language.abbreviation,
							foreignPageUrl:(page.isIndexPage) ? '/' : foreignUrl};

						var navLink = keystone.get('navigation');

						navLink.push(navPoint);
					}
				);
			});
		}) ;
	});
};

Page.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Update navigation on page save
Page.schema.post('save', function () {
	console.log('Save Post');
	updateNavigation();
});

Page.defaultColumns = 'title, language, state, inNavigation';
Page.register();

updateNavigation();

