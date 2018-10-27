var keystone = require('keystone');
var Newsletter = keystone.list('Newsletter');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'newsletter';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.newsletterSubmitted = false;

	// On POST requests, add the Newsletter item to the database
	view.on('post', {action: 'newsletter'}, function (next) {

		var newNewsletter = new Newsletter.model();
		var updater = newNewsletter.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, deutsch, francais',
			errorMessage: 'There was a problem submitting your newsletter request:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('newsletter');
};
