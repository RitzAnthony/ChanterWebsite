var keystone = require('keystone');
var Types = keystone.Field.Types;
var Choir = new keystone.List('Choir');

Choir.add({
	name: {type: String, required: true, initial: true},
	place: {type: String},
	plz: {type: Types.Number},
	director: {type: String},
	president: {type: Types.Relationship, ref: 'User', index: true},
});

Choir.defaultColumns = 'name, place, plz, director, president';

Choir.register();
