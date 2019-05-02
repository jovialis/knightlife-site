const next = require('next');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const Cookies = require('cookies');

const request = require('request-promise-native');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// Validate's the user's Session cookie to ensure they're logged in
function requireLogin(req, res, next) {
	const token = req.cookies.get('Session', {signed: true});

	// Validate the login token with our auth server
	request({
		method: 'POST',
		uri: 'https://api.bbnknightlife.com/auth/validate',
		body: {
			token: token
		},
		json: true
	}).then(body => {
		if (body.valid) {
			req.user = body.user;
			next();
		} else {
			res.redirect('/login');
		}
	}).catch(error => {
		next(error);
	});
}

function requirePermission(permission) {
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
}

app.prepare().then(() => {
	const server = express();

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));

	server.use(session({
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 60000
		}
	}));

	// Enable cookies
	server.use(Cookies.express([process.env.COOKIE_SECRET]));

	// Protect routes
	server.all('dashboard/*', requireLogin, async (req, res) => {
		const parsedUrl = parse(req.url, true)
		handle(req, res, parsedUrl);
	});

	server.get('*', (req, res) => {
		const parsedUrl = parse(req.url, true);
		return handle(req, res, parsedUrl);
	});

	server.listen(process.env.PORT || 2000, (err) => {
		if (err) throw err;
		console.log('Ready to receive requests!');
	});
}).catch((err) => {
	console.error(err.stack);
	process.exit(1);
});