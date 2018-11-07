var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Dropdown Model
 * ==========
 */


var Dropdown = new keystone.List('Dropdown');

Dropdown.add({
	name: {type: String, required: true, index: true},
	language: {type: Types.Relationship, ref: 'Language'}
});



/**
 * Registration
 */
Dropdown.defaultColumns = 'name';
Dropdown.register();
