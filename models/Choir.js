var keystone = require('keystone');
var Types = keystone.Field.Types;
var Choir = new keystone.List('Choir');
var __ = require('../helpers/index').__;

Choir.add({
	name: {type: String, required: true, initial: true, label: __('Name')},
	npa: {type: String, label: __('NPA')},
	place: {type: String, label: __('Place')},
	
	director: {type: Types.Relationship, ref: 'User', index: true, label: __('Director')},
	president: {type: Types.Relationship, ref: 'User', index: true, label: __('President')},
	secretary: {type: Types.Relationship, ref: 'User', index: true, label: __('Secretary')},
	cashier: {type: Types.Relationship, ref: 'User', index: true, label: __('Cashier')},


	type: {type: Types.Relationship, ref: 'ChoirType', index: true, label: __('Type')},
	type2: {type: String, label: __('Type 2')},
	
	//effective: {type: Types.Relationship, ref: 'Effectif', many: true},
	//amende: {type: Types.Relationship, ref: 'Amende', many: true},
	
	foudation_year: {type: Types.Number, label: __('Year of foudation')},
	
	ch_eglise: { type: Types.Boolean, label: __('Ch. eglise') },
	ch_gospel: { type: Types.Boolean, label: __('Ch. gospel')},
	
	is_fc_member: {type: Types.Boolean, label: __('Is member of the federation')},
	date_fc_entry: {type: Types.Date, label: __('Federation entry date')},
	
	group: {type: Types.Relationship, ref: 'ChoirGroup', index: true, label: __('Group')},
	date_group_entry: {type: Types.Date, label: __('Group entry date')},
	
	is_usc_member: {type: Types.Boolean, label: __('Is member of the USC')},
	date_usc_entry: {type: Types.Date, label: __('USC entry date')},
	
	contact: {type: Types.Relationship, ref: 'User', label: __('Contact user')},
	
	// TODO : wait for merging the language branch to have all lang related stuff
	//lang: {type: Types.Relationship, ref: 'Language'},
	
	remarque: {type: Types.Text, label: __('Remarque')},
	
	website: {type: Types.Url, label: __('Website')},
	
	//
	dekanat: {type: String, label: __('Dekanat')},
	
	ocv_list_2014: {type: Types.Boolean, label: __('OCV list 2014'), hidden: true},
	
	usc_id: {type: String, label: __('USC ID')},
	usc_password: {type: String, label: __('USC Password')},
	
	ag2016: {type: Types.Number, label: __('AG 2016')},
	
	updated_at: {type: Types.Date, hidden: true},
});

Choir.schema.pre('save', function(next) {
	if (this.isModified('state')) {
		this.updated_at = new Date();
	}
	next();
});

Choir.defaultColumns = 'name, place, plz, director, president';

Choir.register();
