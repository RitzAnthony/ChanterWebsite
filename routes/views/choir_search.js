var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	let isUscMember = req.query.member_usc;
	let lang = req.query.lang;
	let choirGroup = req.query.choir_group;
	let choirType = req.query.choir_type;
	let choirPresident = req.query.choir_president;
	let choirDirector = req.query.choir_director;
	
	
	/*member_usc
lang
choir_group
choir_type
choir_president
choir_chief*/
	
	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	view.query('choirs', keystone.list('Choir').model.find().sort('sortOrder'));


	view.query('choirGroups', keystone.list('ChoirGroup').model.find());
	view.query('choirTypes', keystone.list('ChoirType').model.find());
	view.query('userPresident', keystone.list('User').model.find().where('group', '5bd1ad2b4a822050964146a2'));
	view.query('userChef', keystone.list('User').model.find().where('group', '5bdc5af50175a84036736f6e'));

	// Render the view
	view.render('choir');

};
