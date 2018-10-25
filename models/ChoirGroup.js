var keystone = require('keystone');
var Types = keystone.Field.Types;
var ChoirGroup = new keystone.List('ChoirGroup');
var __ = require('../helpers/index').__;

ChoirGroup.add({
	slug: {type: String, readonly: true, label: __('Abbrevation')},
	name: {type: String, required: true, initial: true, label: __('Name')},
});


ChoirGroup.defaultColumns = 'slug, name';

ChoirGroup.register();
