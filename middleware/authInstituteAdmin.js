export default function ({ app, error }) {
  if (!app.$auth.loggedIn) {
    error({
      message: 'You must login first!',
      statusCode: 403
    })
  }
  else if (app.$auth.user.role !== 'admin') {
	error({
		message: 'You are not authorized to access this page!',
		statusCode: 403
	})
  }
}
