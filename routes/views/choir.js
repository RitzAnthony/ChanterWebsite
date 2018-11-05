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
		.sort('sortOrder')
	);


	view.query('langs', keystone.list('Language').model.find());
	view.query('choirGroups', keystone.list('ChoirGroup').model.find());
	view.query('choirTypes', keystone.list('ChoirType').model.find());
	view.query('userPresident', keystone.list('User').model.find().populate('group').where('group', {$elemMatch : {slug: 'P'}}));
	view.query('userChef', keystone.list('User').model.find().populate('group').where('group',  {"$in" : 'D'}));

	// Render the view
	view.render('choir');

};
