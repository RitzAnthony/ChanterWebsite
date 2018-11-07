var keystone = require('keystone');
var Types = keystone.Field.Types;
var CommitteeFunction = new keystone.List('CommitteeFunction');
var __ = function(key){return key};

CommitteeFunction.add({
	name: {type: String, required: true, initial: true, label: __('Name')},
});


CommitteeFunction.defaultColumns = 'name';

CommitteeFunction.register();
