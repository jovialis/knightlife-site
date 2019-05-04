const request = require('request-promise-native');
const { parse } = require('url');

// Validate's the user's Session cookie to ensure they're logged in
module.exports.requireLogin = (req, res, next) => {
	// const token = req.cookies.get('Session', {signed: true});
	const token = 'eb348436-cd74-496e-be6a-f8421ffb3e45';

	console.log('requiring login');

	// Validate the login token with our auth server
	request({
		method: 'POST',
		uri: 'https://api.bbnknightlife.com/auth/validate',
		body: {
			token: token
		},
		json: true
	}).then(body => {
		console.log(body);
		if (body.valid) {
			req.user = body.user;
			next();
		} else {
			res.redirect('/login');
		}
	}).catch(error => {
		next(error);
	});
};

module.exports.requirePermission = (permission) => {
	return function requireLogin(req, res, next) {
		const token = req.cookies.get('Session', {signed: true});

		// Validate the login token with our auth server
		request({
			method: 'POST',
			uri: 'https://api.bbnknightlife.com/auth/validate/permission',
			body: {
				token: token,
				permission: permission
			},
			json: true
		}).then(body => {
			if (body.valid) {
				req.user = body.user;
				next();
			} else {
				res.writeHead(401, {
					'WWW-Authentication': 'Basic'
				});
				res.end("Unauthorized access");
			}
		}).catch(error => {
			next(error);
		});
	}
};