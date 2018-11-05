var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find()
		.populate('type')
		.populate('group')
		.populate('president')
		.populate('director')
		.sort('sortOrder')
	);


	view.query('userGroupP', keystone.list('UserGroup').model.find().where('slug', 'P'));
	view.query('userGroupD', keystone.list('UserGroup').model.find().where('slug', 'D'));

	view.query('langs', keystone.list('Language').model.find());
	view.query('choirGroups', keystone.list('ChoirGroup').model.find());
	view.query('choirTypes', keystone.list('ChoirType').model.find());
	view.query('users', keystone.list('User').model.find());

	// Render the view
	view.render('choir');

};
