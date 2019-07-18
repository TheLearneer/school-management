const Permissions = {
  'MANAGE_INSTITUTE': 1,
  'EDIT_INSTITUTE': 2,
  'MANAGE_ADMINS': 4,
  'MANAGE_INSTITUTE_PERMISSIONS': 8,
  'MANAGE_NOTICE': 10
}

function hasPermission(perms, permToCheck) {
  return Boolean(parseInt(perms) & Permissions[permToCheck]);
}

function getPermissions(perms) {
  const permKeys = [];
  Object.keys(Permissions).forEach(permKey => {
    if (hasPermission(perms, permKey)) permKeys.push(permKey);
  })
  return permKeys;
}

function getRole(perms) {
  if (perms === 0) return 'student';
  else if (hasPermission(perms, 'MANAGE_INSTITUTE')) return 'super-admin'
  else if (hasPermission(perms, 'EDIT_INSTITUTE')) return 'admin';
  else return 'teacher';
}

export default {
  hasPermission,
  getPermissions,
  getRole
};
