var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var isIndexSearched = (req.originalUrl == '/')? true : false; 

	// Set locals
	//locals.section = 'pages';
	locals.section = '';
	locals.filters = {
		page: req.params.page,
	};
	locals.data = {
		pages: [],
	};

	// Load the current page
	view.on('init', async function (next) {
		var currentLanguage = await keystone.list('Language').model.findOne({
			abbreviation: keystone.get('language').currentLanguage,
		});
			
			keystone.get('language').currentLanguage;

			 
		var q; 
		if (locals.filters.page == undefined){
			q = keystone.list('Page').model.findOne({
				isIndexPage: true,
				language: currentLanguage._id,
			});
		} else {
			q = keystone.list('Page').model.findOne({
				state: 'published',
				slug: locals.filters.page,
				language: currentLanguage._id,
			});
		}

		q.exec(function (err, result) {
			locals.data.page = result;
			locals.section = (result != undefined) ? result.slug : '/';
			if(result == undefined && isIndexSearched) {
				locals.section = 'error';
				res.redirect('/error');
			}else {
				next(err);
			}
		});

	});

	// Load other pages
	view.on('init', function (next) {

		var q = keystone.list('Page').model.find().where('state', 'published').sort('-publishedDate').limit('4');

		q.exec(function (err, results) {
			locals.data.pages = results;
			next(err);
		});

	});

	// Render the view
	view.render('page');
};
