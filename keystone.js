// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var i18n = require('i18n');
var handlebars = require('express-handlebars');
var hbs = require('handlebars');
require('./helpers/handlebars')(hbs);

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.




keystone.init({
	'name': 'www.chanter.ch',
	'brand': 'www.chanter.ch',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	
	// Database connection configuration
	'mongo': 'mongodb://localhost:27017',
	
	
	'session': true,
	'auth': true,
	'user model': 'User',
});





//tabs of the navigation bar
keystone.set('navigation', []);

//Used for redirection from one language to an other
keystone.set('foreignReferences',[]);


// Set the default theme
keystone.set('theme', 'Cerulean');

// Load your project's Models
keystone.import('models');



getLanguages();
function getLanguages() {
	var languages = [{'title':'Deutsch', 'abbreviation':'de'},
		{'title':'Francais', 'abbreviation':'fr'}];

	keystone.set('availableLanguages', languages);
	keystone.set('language', {'currentLanguage': languages[0].abbreviation});
}


// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});


i18n.configure({
	locales:['fr', 'de', 'en'],
	defaultLocale: 'fr',
	directory: __dirname + '/locales',
	register: global
});


keystone.set('signin logo', '../images/FSCV_logo.png');

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	pages: ['pages', 'dropdowns'],
	languages: 'languages',
	posts: ['posts', 'post-categories'],
	choirs: ['choirs', 'choir-types', 'choir-groups'],
	users: ['users', 'user-groups'],
	committee: ['committees', 'committee-members', 'committee-functions'],
	events: 'events',
	enquiries: 'enquiries',
	newsletters: 'newsletters',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
		+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
		+ '\n----------------------------------------'
		+ '\nYou have opted into email sending but have not provided'
		+ '\nmailgun credentials. Attempts to send will fail.'
		+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
		+ '\nset up your mailgun integration');
}


keystone.start();
