var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Statistic Model
 * =============
 */

var Statistic = new keystone.List('Statistic', {
	nocreate: true,
	noedit: true,
	hidden: true,
});

Statistic.add(
	{
	url: {type: String, required: true},
	called: {type: Number},
	date: {type: String, default: new Date().toLocaleDateString()},
	}
);


Statistic.defaultSort = '-date';
Statistic.defaultColumns = 'url, called, date';
Statistic.register();
