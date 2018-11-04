var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find().sort('sortOrder'));
	
	
	view.query('choirGroups', keystone.list('ChoirGroup').model.find());
	view.query('choirTypes', keystone.list('ChoirType').model.find());
	view.query('userPresident', keystone.list('User').model.find().where('group.__ref', 'p'));
	
	let query = keystone.list('UserGroup').model.find().where('slug', 'P')
	
	view.query('userDirector', keystone.list('User').model.find().where('group.__ref', 'd'));

	// Render the view
	view.render('choir');

};
