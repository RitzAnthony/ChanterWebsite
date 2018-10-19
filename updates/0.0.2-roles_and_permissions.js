exports.create = {
	Role: [
		{
			'name': 'Public',
			__ref: 'role_public'
		},
		{
			'name': 'Admin Choir',
			__ref: 'role_choir_admin'
		},
		{
			'name': 'Newsletter manager',
			__ref: 'role_newsletter_manager'
		},
		{
			'name': 'List manager',
			__ref: 'role_list_manager'
		},
		{
			'name': 'Editor',
			__ref: 'role_editor'
		},
		{
			'name': 'Traductor',
			__ref: 'role_traductor'
		},
		{
			'name': 'Webmaster',
			__ref: 'role_webmaster'
		},
		{
			'name': 'Super Admin',
			__ref: 'role_super_admin'
		}
	],
	Permission: [
		{
			'name': 'Role List Permissions',
			'listName': 'Role',
			'create': ['role_super_admin'],
			'read': ['role_super_admin'],
			'update': ['role_super_admin'],
			'delete': ['role_super_admin'],
			__ref: 'permission_role'
		},
		{
			'name': 'User List Permissions',
			'listName': 'User',
			'create': ['role_super_admin'],
			'read': ['role_super_admin'],
			'update': ['role_super_admin'],
			'delete': ['role_super_admin'],
			__ref: 'permission_user'
		},
		{
			'name': 'Permission List Permissions',
			'listName': 'Permission',
			'create': ['role_super_admin'],
			'read': ['role_super_admin'],
			'update': ['role_super_admin'],
			'delete': ['role_super_admin'],
			__ref: 'permission_permission'
		}
	],
};
