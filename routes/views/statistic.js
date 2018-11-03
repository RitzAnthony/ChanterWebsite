var keystone = require('keystone');
var Statistic = keystone.list('Statistic');

exports = module.exports = async function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'statistic';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	
	var last30dates = new Array();

	for (let i = 30; i >= 0; i--) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - i); 
		last30dates.push(currentDate.toLocaleDateString()); 
	}

	var statistics = await Statistic.model.find().exec();
	var urls = new Array(); 
	statistics.forEach((item)=> {
		if (!urls.includes(item.url) && 
			!item.url.includes('font') &&
			!item.url.includes('keystone')&&
			!item.url.includes('statistic')) {
			urls.push(item.url)
		} 
	});

	var datasets = new Array();

	for (let i = 0; i < urls.length; i++) {
		
	
	
		var dateValues = new Array()
		for (let j = 0; j < last30dates.length; j++) {
			
		
		
			var currentStat = statistics.filter((item) => {
				return (item.date == last30dates[j] && item.url == urls[i]);
			});
			if (currentStat.length == 0){
				dateValues.push(0);
			} 
			else {
				dateValues.push(currentStat[0].called);
			}
		}
		datasets.push({
			label: urls[i],
			data: dateValues,
			backgroundColor: [
				'rgba(105, 0, 132, .2)',
			],
			borderColor: [
				'rgba(200, 99, 132, .7)',
			],
			borderWidth: 2
		});
	}
	
	locals.labels = JSON.stringify(last30dates);
	locals.datasetsStringify = JSON.stringify(datasets);
	locals.datasets = datasets;


	view.render('statistic');
};
