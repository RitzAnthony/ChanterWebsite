var keystone = require('keystone');
var Types = keystone.Field.Types;
var Choir = new keystone.List('Choir');

Choir.add({
	name: {type: String, required: true, initial: true},
	npa: {type: String},
	place: {type: String},
	
	director: {type: Types.Relationship, ref: 'User', index: true},
	president: {type: Types.Relationship, ref: 'User', index: true},
	secretary: {type: Types.Relationship, ref: 'User', index: true},
	cashier: {type: Types.Relationship, ref: 'User', index: true},


	type: { type: Types.Select, options: 'CX, CD, CH, CJ, CE', default: 'CX' },
	type2: {type: String},
	
	//effective: {type: Types.Relationship, ref: 'Effectif', many: true},
	//amende: {type: Types.Relationship, ref: 'Amende', many: true},
	
	foudation_year: {type: Types.Number, label: 'Year of foudation'},
	
	ch_eglise: { type: Types.Boolean },
	ch_gospel: { type: Types.Boolean },
	
	is_fc_member: {type: Types.Boolean},
	date_fc_entry: {type: Types.Date},
	
	group: {type: String},
	date_group_entry: {type: Types.Date},
	
	is_usc_member: {type: Types.Boolean},
	date_usc_entry: {type: Types.Date},
	
	contact: {type: Types.Relationship, ref: 'User'},
	
	// TODO : wait for merging the language branch to have all lang related stuff
	//lang: {type: Types.Relationship, ref: 'Language'},
	
	remarque: {type: Types.Text},
	
	website: {type: Types.Url},
	
	//
	dekanat: {type: String},
	
	ocv_list_2014: {type: Types.Boolean},
	
	usd_id: {type: String},
	usd_password: {type: String},
	
	ag2016: {type: Types.Number},
	
	updated_at: {type: Types.Date},
});

Choir.schema.pre('save', function(next) {
	if (this.isModified('state')) {
		this.updated_at = new Date();
	}
	next();
});

Choir.defaultColumns = 'name, place, plz, director, president';

Choir.register();
