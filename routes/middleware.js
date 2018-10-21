
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

	if (req.query.language) {
		var lang = keystone.get('language');
			lang.currentLanguage = req.query.language;
	}

	//default navs
	res.locals.navLinks = [
		{label: 'Home', key: 'home', href: '/'},
		{label: 'Gallery', key: 'gallery', href: '/gallery'},
		{label: 'Events', key: 'events', href: '/events'},
		{label: 'Contact', key: 'contact', href: '/contact'},
		{label: 'Blog', key: 'blog', href: '/blog'},
	];

	res.locals.navLinks = keystone.get('navigation');
	res.locals.currentLanguage = keystone.get('language').currentLanguage;
	res.locals.availableLanguages = keystone.get('availableLanguages'); 

	//adding dynamic site from Page model
	res.locals.user = req.user;
	
	next();
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
