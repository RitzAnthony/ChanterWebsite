
/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');
var Statistic = keystone.list('Statistic');

/**
 Initialises the standard view locals

 The included layout depends on the navLinks array to generate
 the navigation in the header, you may wish to change this array
 or replace it with your own templates / logic.
 */
exports.initLocals = function (req, res, next) {
	var locals = res.locals;

	var lang = keystone.get('language');
	
	if(req.session.currentLanguage == undefined){ //TODO Language should be added in session
		req.session.currentLanguage = keystone.get('language').currentLanguage;
	}

	//redirection when the language is changed
	if (req.query.language && req.query.language != lang.currentLanguage ) {
		lang.currentLanguage = req.query.language;
		
		// First get navLinks from the navigation tree that are in a dropdown menu
		var navLinks = keystone.get('navigation')
			.filter((nav)=>{ return nav.isDropdown == false});
		
		// Then add the navLinks that are located in a  menu
		keystone.get('navigation')
			.filter((nav)=>{ return nav.isDropdown == true})
			.forEach((dropdown) => {navLinks.push.apply(navLinks, dropdown.pages)});
		
		
		var searchedUrl = req.originalUrl.split("?")[0];
		var result = navLinks.find((nav)=>{
			return nav.href == searchedUrl});
		if(result == undefined){
			result = '/';
		}
		else {
			if (result.foreignPageUrl == undefined) {
				result = '/';
			}
			else {
				result = result.foreignPageUrl;
			}
		}
		res.redirect(result);

	}
	else{ // this else is executed when the language is not changed

		//default static navs
		var staticNavLinks = [
			//TODO add foreignPageUrl attribute to this navlinks, otherwise language redirection will 
			//German static navigation tabs
			{label: 'Gallerie', key: 'gallery', href: '/gallery', language: 'de',
				foreignPageUrl:'/gallery',isDropdown:false},
			
			{label: 'Events', key: 'events', href: '/events', language: 'de',
				foreignPageUrl:'/events',isDropdown:false},
			
			{label: 'Chöre', key: 'choir', href: '/choirs', language: 'de',
				foreignPageUrl:'/choirs',isDropdown:false},
			
			{label: 'Blog', key: 'blog', href: '/blog', language: 'de',
				foreignPageUrl:'/blog',isDropdown:false},
			
			{label: 'Kontakt', key: 'contact', href: '/contact', language: 'de',
				foreignPageUrl:'/contact',isDropdown:false},
			
			{label: 'Newsletter', key: 'newsletter', href: '/newsletter', language: 'de',
				foreignPageUrl:'/newsletter',isDropdown:false},

			//French static navigation tabs //TODO translate french labels
			{label: 'Gallery', key: 'gallery', href: '/gallery', language: 'fr',
				foreignPageUrl:'/gallery',isDropdown:false},

			{label: 'Events', key: 'events', href: '/events', language: 'fr',
				foreignPageUrl:'/events',isDropdown:false},

			{label: 'Choirs', key: 'choir', href: '/choirs', language: 'fr',
				foreignPageUrl:'/choirs',isDropdown:false},

			{label: 'Blog', key: 'blog', href: '/blog', language: 'fr',
				foreignPageUrl:'/blog',isDropdown:false},

			{label: 'Contact', key: 'contact', href: '/contact', language: 'fr',
				foreignPageUrl:'/contact',isDropdown:false},

			{label: 'Newsletter', key: 'newsletter', href: '/newsletter', language: 'fr',
				foreignPageUrl:'/newsletter',isDropdown:false},
		];

		staticNavLinks.push.apply(staticNavLinks,keystone.get('navigation'));

		//move the index pages to to the top of the array, so the are displayed on the left
		for (let i = 0; i < staticNavLinks.length; i++) {
			if (staticNavLinks[i].href == '/') {
				staticNavLinks.splice(0, 0, staticNavLinks.splice(i, 1)[0]);
			}
		}


		res.locals.navLinks = staticNavLinks;
		res.locals.currentLanguage = keystone.get('language').currentLanguage;
		res.locals.availableLanguages = keystone.get('availableLanguages');

		//adding dynamic site from Page model
		res.locals.user = req.user;

		//Set the changed theme or the current theme
		if (req.query.theme) {
			res.locals.theme = req.query.theme;
			keystone.set('theme', req.query.theme);
		}
		else {
			res.locals.theme = keystone.get('theme')
		}
		
		//adding selectable themes for the admin
		res.locals.themes = [
			'Flatly',
			'Cerulean',
			'Journal',
			'Simplex',
			'United',
		];
		
		updateStatistic(req.originalUrl.split("?")[0]);

		next();
	}
};
 
function updateStatistic(url) {
	Statistic.model
		.find()
		.where({date: new Date().toLocaleDateString(),
				url: url})
		.limit(1)
		.exec( 
		(err, statistic) => {
			if (statistic.length == 0) {
				var newStatistic = new Statistic.model({
					url: url,
					called: 1,
				});
				newStatistic.save();
			}
			else {
				statistic[0].called++;
				statistic[0].save();
			}
		}
	);
}


/**
 Fetches and clears the flashMessages before a view is rendered
 */
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};


/**
 Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
