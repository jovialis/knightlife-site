const { parse } = require('url');

const auth = require('./middlewares/auth');

module.exports.registerRoutes = (router, app, handle) => {

	// Protect route page and pass User
	// passUserToLoginProtectedPage('/dashboard', router, app);

	passUserToPermissionProtectedPage('/dashboard/lunch', 'lunch', router, app);

};

function passUserToLoginProtectedPage(route, router, app) {
	router.get(route, auth.requireLogin, (req, res) => {
		// Pass User data to page as a query object
		app.render(req, res, route, req.query);
	});
}

function passUserToPermissionProtectedPage(route, permission, router, app) {
	router.get(route, auth.requirePermission(permission), (req, res) => {
		app.render(req, res, route, req.query);
	});
}