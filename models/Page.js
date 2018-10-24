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
	Page.model.find({
		state: 'published',
		inNavigation: true,
	}, function(err, pages) {
		console.log(pages.length);
		pages.forEach(function(page, i) {
			Page.model.findById(page.foreignPage).exec(function(err, foreignPage) {
				languageList.model.findById(page.language).exec(
					function(err, language) {
						var navPoint = {
							label: page.title,
							key: page.title.toLowerCase(),
							href: '/pages/page/'+page.slug.toLowerCase().replace(" ","%20"),
							language: language.abbreviation,
							foreignPageUrl: '/pages/page/'+foreignPage.slug.toLowerCase().replace(" ","%20")};

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
	//updateNavigation();
});

Page.defaultColumns = 'title, language, state, inNavigation';
Page.register();

updateNavigation();

