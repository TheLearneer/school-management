import perms from '~/utility/permissionHandler';

export default function({ app, redirect, route }) {
	// Checking if user is logged in...
	if (!app.$auth.loggedIn) return redirect('/login');
	// Getting the user...
	const user = app.$auth.user;
	// Redirecting user to home page if user got nothing to do i.e. no permissions...
	if (!user.permissions.length && route.path !== '/dashboard/me') return redirect('/');
	// Getting the id from the route query...
	const { id } = route.query;
	
	// Regex for dashboard paths...
	const regexSuperAdminURL = /^\/dashboard\/Super-Admin(?:\/(?=$))?$/i.toString();
	const regexAdminURL = /^\/dashboard\/Admin(?:\/(?=$))?$/i.toString();
	const regexTeacherURL = /^\/dashboard\/Teacher(?:\/(?=$))?$/i.toString();
	const regexStudentURL = /^\/dashboard\/Student(?:\/(?=$))?$/i.toString();
	
	// Regex of the matched route...
	const routeRegex = route.matched[0].regex.toString()
	
	// Checking which route of dashboard it is...
	if (routeRegex === regexSuperAdminURL) {
		// Checking if user has super-admin perms or not...
		if (!user.permissions.find(_perm => perms.hasPermission(_perm.permissions, 'MANAGE_INSTITUTE'))) return redirect('/dashboard');
	} else if (routeRegex === regexAdminURL) {
		// Early exit if ID is not available
		if (!id) return redirect('/dashboard');
		// Getting the permission of user for specified institute
		const insPerms = user.permissions.find(_perm => _perm.instituteid === id);
		// Exiting if user has no perms...
		if (!insPerms || !perms.hasPermission(insPerms.permissions, 'EDIT_INSTITUTE')) return redirect('/dashboard');		
	}
}
