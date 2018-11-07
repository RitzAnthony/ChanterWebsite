var keystone = require('keystone');
var Types = keystone.Field.Types;
var CommitteeMember = new keystone.List('CommitteeMember');
var __ = function(key){return key};

CommitteeMember.add({
	name: {type: String, required: true, initial: true, label: __('Name')},
	person: {type: Types.Relationship, ref: 'User', label: __('User')},
	function: {type: Types.Relationship, ref: 'CommitteeFunction', label: __('Function')},
});


CommitteeMember.defaultColumns = 'name';

CommitteeMember.register();
