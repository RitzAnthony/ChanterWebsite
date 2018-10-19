var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */


var User = new keystone.List('User');

User.add({
	title: {type: Types.Select, options: 'Mr., M.', default: 'Mr.'},
	name: {type: Types.Name, required: true, index: true},
	function: {type: String},
	address1: {type: String},
	address2: {type: String},
	locality: {type: String},
	npa: {type: String},
	
	phone: {type: String},
	phone_pro: {type: String},
	fax: {type: String},
	phone_mobile: {type: String},
	
	email: {type: Types.Email, initial: true, required: true, unique: true, index: true},
	password: {type: Types.Password, initial: true, required: true},


	roles: { type: Types.Relationship, ref: 'Role', many: true },
	
	
}, 'Permissions', {
	isAdmin: {type: Boolean, label: 'Can access Keystone', index: true},
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
