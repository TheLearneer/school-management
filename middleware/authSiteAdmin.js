//import perms from '~/utility/permissions';

export default function ({ app, redirect }) {
  // Checking if user is logged in...
  if (!app.$auth.loggedIn) return redirect('/login');
  
  //if (app.$auth.user.permissions.filter(_perm => perms.hasPermission(_perms.permissions, 'SUPER_ADMIN')).length < 1) redirect('/dashboard')
}
