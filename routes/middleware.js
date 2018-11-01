
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

/**
 Initialises the standard view locals

 The included layout depends on the navLinks array to generate
 the navigation in the header, you may wish to change this array
 or replace it with your own templates / logic.
 */
exports.initLocals = function (req, res, next) {
	var locals = res.locals;

	var lang = keystone.get('language');

	if (req.query.language && req.query.language != lang.currentLanguage ) {
		lang.currentLanguage = req.query.language;
		var navigs = keystone.get('navigation');
		var searchedUrl = req.originalUrl.split("?")[0];
		var result = navigs.find((nav)=>{
			return nav.href == searchedUrl}).foreignPageUrl;
		if(result == undefined){
			result = '/';
		}
		res.redirect(result);

	}
	else{

		//default static navs
		var navLinks = [
			//TODO add foreignPageUrl attribute to this navlinks, otherwise language redirection will fail
			{label: 'Gallery', key: 'gallery', href: '/gallery'},
			{label: 'Events', key: 'events', href: '/events'},
			{label: 'Choirs', key: 'choir', href: '/choirs'},
			{label: 'Blog', key: 'blog', href: '/blog'},
			{label: 'Contact', key: 'contact', href: '/contact'},
			{label: 'Newsletter', key: 'newsletter', href: '/newsletter'}
		];

		navLinks.push.apply(navLinks,keystone.get('navigation'));

		//move the index pages to to the top of the array, so the are displayed on the left
		for (let i = 0; i < navLinks.length; i++) {
			if (navLinks[i].href == '/') {
				navLinks.splice(0, 0, navLinks.splice(i, 1)[0]);
			}
		}


		res.locals.navLinks = navLinks;
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

		next();
	}
};

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
