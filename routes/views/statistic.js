var keystone = require('keystone');
var Newsletter = keystone.list('Newsletter');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'statistic';
	locals.formData = req.body || {};
	locals.validationErrors = {};

	view.render('statistic');
};
