var keystone = require('keystone');

exports = module.exports = function (req, res) {

	req.setLocale(keystone.get('language').currentLanguage);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'committee';

	
	let committeQuery = keystone.list('Committee').model
		.find()
		.populate({
			path: 'members', 
			populate: [
				{
					path: 'person'
				},
				{
					path: 'function'
				},
			]
		});
	
	// Load the items by sortOrder
	view.query('committee', committeQuery);

	// Render the view
	view.render('committee');

};
