const next = require('next');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');

const request = require('request-promise-native');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

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

	require('./routes').registerRoutes(server, app, handle);

	// Default route handler
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