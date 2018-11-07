var keystone = require('keystone');
var Types = keystone.Field.Types;
var UserGroup = new keystone.List('UserGroup');
var __ = function(key){return key};

UserGroup.add({
	slug: {type: String, readonly: true, label: __('Abbrevation')},
	name: {type: String, required: true, initial: true, label: __('Name')},
});


UserGroup.defaultColumns = 'slug, name';

UserGroup.register();
