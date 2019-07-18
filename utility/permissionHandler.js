const Permissions = {
  'MANAGE_INSTITUTE': {
	value: 1,
	description: 'Add/Remove Institutes'
  },
  'EDIT_INSTITUTE': {
	value: 2,
	description: 'Update Institute details'
  },
  'MANAGE_ADMINS': {
	value: 4,
	description: 'Add/Remove Institute admins'
  },
  'MANAGE_INSTITUTE_USERS': {
	value: 8,
	description: 'Add/Remove users affiliated with Institute'
  },
  'MANAGE_NOTICE': {
	value: 10,
	description: 'Add/Remove notices'
  }
}

function getDescriptions(perms) {
  const descriptions = getPermissions(perms).map(_perm => Permissions[_perm].description);
  if (!descriptions.length) descriptions.push('Read informations!');
  return descriptions;
}

function hasPermission(perms, permToCheck) {
  return Boolean(parseInt(perms) & Permissions[permToCheck].value);
}

function getPermissions(perms) {
  const permKeys = [];
  Object.keys(Permissions).forEach(permKey => {
    if (hasPermission(perms, permKey)) permKeys.push(permKey);
  })
  return permKeys;
}

export default {
  hasPermission,
  getPermissions,
  getDescriptions
};
