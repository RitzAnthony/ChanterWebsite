var keystone = require('keystone');
var Types = keystone.Field.Types;
var ChoirType = new keystone.List('ChoirType');
var __ = require('../helpers/index').__;

ChoirType.add({
	slug: {type: String, readonly: true, label: __('Abbrevation')},
	name: {type: String, required: true, initial: true, label: __('Name')},
});


ChoirType.defaultColumns = 'slug, name';

ChoirType.register();
