const next = require('next');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressSsl = require('express-sslify');

const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// Parse POST body
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));

	// CORS support
	server.use(cors());

	// Redirect to HTTPS when allowed
	if (process.env.NODE_ENV === 'production') {
		server.use(expressSsl.HTTPS({trustProtoHeader: true}));
	}

	server.get('/api/*', (req, res) => {
		const url = req.originalUrl;
		res.redirect(`https://old.bbnknightlife.com${ url }`);
	});

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