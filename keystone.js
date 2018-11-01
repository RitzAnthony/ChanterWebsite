// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var i18n = require('i18n');
var handlebars = require('express-handlebars');

/*var express = require('express'), //TODO (Autor:Anthony) i think this can be removed
	app = express(),
	cookieParser = require('cookie-parser'),
	cookieLanguage = 'myLanguage';

app.use(cookieParser(cookieLanguage));
keystone.app = app; */

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.


i18n.configure({
	locales:['fr', 'de'],
	cookie: 'locale',
	defaultLocale: 'fr',
	directory: __dirname + '/locales',
	queryParameter: 'lang',
});

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
	//'mongo': 'mongodb://mongo:27017',
	'mongo': 'mongodb://localhost:27017',
	//'mongo': 'mongodb://hans:Qwertzuiop123@cluster0-shard-00-00-db0ox.mongodb.net:27017,cluster0-shard-00-01-db0ox.mongodb.net:27017,cluster0-shard-00-02-db0ox.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
	'session': true,
	'auth': true,
	'user model': 'User',
});
keystone.set('navigation', []);

/*keystone.set('navigation', [{ TODO this can be removed, static navigation will be set in middleware
	label: 'Home',
	key: 'home',
	href: '/'
},  {
	label: 'Gallery',
	key: 'gallery',
	href: '/gallery'
},  {
	label: 'Events',
	key: 'events',
	href: '/events'
},  {
	label: 'Blog',
	key: 'blog',
	href: '/blog'
}, {
	label: 'Choir',
	key: 'choir',
	href: '/choir'
},{
	label: 'Contact',
	key: 'contact',
	href: '/contact'
}]); */

// Set the default theme
keystone.set('theme', 'Cerulean');

// Load your project's Models
keystone.import('models');



getLanguages();
function getLanguages() {
	keystone.list('Language').model.find().exec((err, languages) =>{
		keystone.set('availableLanguages', languages);
		keystone.set('language', {'currentLanguage': languages[0].abbreviation});
	});
	
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

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	pages: 'pages',
	languages: 'languages',
	posts: ['posts', 'post-categories'],
	choirs: ['choirs', 'choir-types', 'choir-groups'],
	users: ['users', 'user-groups'],
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
