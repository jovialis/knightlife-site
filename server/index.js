const next = require('next');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function requireLogin(req, res, next) {
	if (req.session.loggedIn) {
		next();
	} else {
		res.redirect('/login');
	}
}

app.prepare().then(() => {
	const server = express();

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	server.use(session({
		secret: process.env.SESSION_SECRET,
		cookie: {
			maxAge: 60000
		}
	}));

	// Protect routes
	server.all('dashboard/*', requireLogin, async (req, res) => {
		next();

		next.render(req, res, "dashboard/fdfdf", {

		});
	});

	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(process.env.PORT || 2000, (err) => {
		if (err) throw err;
		console.log('Ready to receive requests!');
	});
}).catch((err) => {
	console.error(err.stack);
	process.exit(1);
});