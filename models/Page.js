var keystone = require('keystone');
var Types = keystone.Field.Types;
var languageList = keystone.list('Language');
var dropdownList = keystone.list('Dropdown');

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
	inDropdown: {type: Types.Relationship, ref: 'Dropdown'},
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
		dropdownList.model.find().exec(function(err, dropdowns) {
			var navLink = keystone.get('navigation');

			dropdowns.forEach(async (dropdown) => {
			var currentLanguage =await languageList.model.findById(dropdown.language).exec(); 
				
			var navPoint = {
				label: dropdown.name,
				language: currentLanguage.abbreviation,
				isDropdown: true,
				pages: []};
			
			navLink.push(navPoint);
			});

			pages.forEach(function(page, i) {
				Page.model.findById(page.foreignPage).exec(function(err, foreignPage) {
					languageList.model.findById(page.language).exec(
						function(err, language) {
							var currentDropdown = dropdowns.find(function (element)
							{return (element._id.toString() == page.inDropdown)});

							var foreignUrl = (foreignPage != undefined)?
								'/'+foreignPage.slug.toLowerCase().replace(" ","") : '/';

							var url = (page.isIndexPage) ? '/' :  '/'+page.slug.toLowerCase().replace(" ","");

							var navPoint = {
								label: page.title,
								key: page.slug,
								href: url,
								language: language.abbreviation,
								foreignPageUrl:(page.isIndexPage) ? '/' : foreignUrl,
								isDropdown:false};
							
							if (currentDropdown != undefined){
								var relatedDropdown = navLink.find(function (element)
								{return (element.label == currentDropdown.name)});

								relatedDropdown.pages.push(navPoint);
							}
							else {
								navLink.push(navPoint);
							}
						}
					);
				});
			});
		});
	});
}

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

