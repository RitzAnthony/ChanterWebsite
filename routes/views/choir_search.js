var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	let isFcMember = req.query.member_fc;
	let lang = req.query.lang;
	let choirGroup = req.query.choir_group;
	let choirType = req.query.choir_type;
	let choirPresident = req.query.choir_president;
	let choirDirector = req.query.choir_director;
	
	
	// Set locals
	locals.section = 'choir';

	// Load the items by sortOrder
	
	let choirQuery = keystone.list('Choir').model.find();
	
	if(typeof isFcMember !== 'undefined' && isFcMember != -1)
		choirQuery = choirQuery.where('is_fc_member', isFcMember);

	if(typeof lang !== 'undefined' && lang !== 'all')
		choirQuery = choirQuery.where('language', lang);
	
	
	if(typeof choirGroup !== 'undefined' && choirGroup !== 'all')
		choirQuery = choirQuery.where('group',  { "$in" : [choirGroup]});

	if(typeof choirType !== 'undefined' && choirType !== 'all')
		choirQuery = choirQuery.where('type',  { "$in" : [choirType]});

	if(typeof choirPresident !== 'undefined' && choirPresident !== 'all')
		choirQuery = choirQuery.where('president',  choirPresident);

	if(typeof choirDirector !== 'undefined' && choirDirector !== 'all')
		choirQuery = choirQuery.where('director', choirDirector);


	
	view.query('choirs', choirQuery
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
	view.render('choir', {
		form: {
			isFcMember: req.query.member_fc,
			lang: req.query.lang,
			choirGroup: req.query.choir_group,
			choirType: req.query.choir_type,
			choirPresident: req.query.choir_president,
			choirDirector: req.query.choir_director,
		}
	});

};
