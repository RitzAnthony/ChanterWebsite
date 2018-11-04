var keystone = require('keystone');
var Types = keystone.Field.Types;
var Committee = new keystone.List('Committee');
var __ = require('../helpers/index').__;

Committee.add({
	name: {type: String, required: true, initial: true, label: __('Name')},
	members: {type: Types.Relationship, ref: 'CommitteeMember', many: true, label: __('Members')},
});


Committee.defaultColumns = 'name';

Committee.register();
