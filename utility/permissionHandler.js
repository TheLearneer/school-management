const Permissions = {
  SUPER_ADMINISTRATOR: 1 << 0,
  ADMINISTRATOR: 1 << 1,
  MANAGE_ADMINS: 1 << 2,
  MANAGE_INSTITUTE_USERS: 1 << 3,
  MANAGE_NOTICE: 1 << 4,
  MANAGE_ASSIGNMENTS: 1 << 5
}

/**
 * Bitfield representing every permission combined
 * @type {number}
 */
const ALL = Object.keys(Permissions).reduce((all, p) => all | Permissions[p], 0);

function getDescription(permission) {
	// Recursive calling if array is provided...
	if (permission instanceof Array) return permission.map(p => getDescription(p));
	// Switch case...
	switch (permission.toUpperCase()) {
		case 'SUPER_ADMINISTRATOR':
			return 'The so called god of the site';
		case 'ADMINISTRATOR':
			return 'Administrator of the institute!';
		case 'MANAGE_ADMINS':
			return 'Add or Remove admins for the institute!';
		case 'MANAGE_INSTITUTE_USERS':
			return 'Add or Remove users affiliated with the institute!';
		case 'MANAGE_NOTICE':
			return 'Add or Remove Notices for the institute!';
		case 'MANAGE_ASSIGNMENTS':
			return 'Upload new assignments or mark old as completed';
	}
}
/**
 * Resolve all the permissions to their numeric form.
 * @param {String[]} permission Array of permissions
 * @returns {number}
 */
function resolve(permission) {
	if (permission instanceof Array && !permission.length) return 0;
	if (permission instanceof Array) return permission.map(p => resolve(p)).reduce((prev, p) => prev | p);
	if (typeof permission === 'string') permission = Permissions[permission];
	return permission;
}

/**
 * Check whether a permission numeric bit has a specific permission or not.
 * @param {number} permissions Permission bitfield
 * @param {String[]} Permissions to check for
 * @returns {Boolean}
 */
function hasPermission(permissions, permission) {
  if (permission instanceof Array) return permission.every(p => has(permissions, p));
  permission = resolve(permission);
  return (permissions & permission) === permission;
}

/**
 * Get an array of permission names based on the permission bitfield
 * @param {number} permissions Permission bitfield
 * @returns {string[]}
 */
function available(permissions) {
  return Object.keys(Permissions).filter(perm => hasPermission(permissions, perm));
}

export default {
	resolve,
	hasPermission,
	getDescription,
	available,
	ALL
};