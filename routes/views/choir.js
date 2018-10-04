var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find().sort('sortOrder'));

	// Render the view
	view.render('choir');

};
