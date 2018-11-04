var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'committee';

	// Load the items by sortOrder
	view.query('committee', keystone.list('Committee').model.find());

	// Render the view
	view.render('committee');

};
