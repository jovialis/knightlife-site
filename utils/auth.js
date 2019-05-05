import Router from 'next/router'

import axios from 'axios';
import Cookies from "cookies";

export const requireLogin = async (req, res, redirect) => {
	let shouldRedirect;
	let user;

	if (req) {
		// Server side
		let cookies = new Cookies(req, res, [process.env.COOKIE_SECRET]);
		let token = cookies.get('Session', {signed: true});

		try {
			const res = await axios.get(`https://api.bbnknightlife.com/auth/validate?token=${token}`);
			shouldRedirect = !(res.data && res.data.valid);

			user = res.data.user;
		} catch (error) {
			console.log(error);
			shouldRedirect = true
		}

		if (shouldRedirect) {
			res.writeHead(302, {Location: redirect});
			res.end();
		} else {
			return user;
		}
	} else {
		// Client side
		try {
			const res = await axios.get('https://api.bbnknightlife.com/auth/validate');
			shouldRedirect = !(res.data && res.data.valid);

			user = res.data.user;
		} catch (error) {
			console.log(error);
			shouldRedirect = true
		}

		if (shouldRedirect) {
			Router.push(redirect);
		} else {
			return user;
		}
	}
};

export const requirePermission = async (permission, req, res, redirect) => {
	let shouldRedirect;
	let user;

	if (req) {
		// Server side
		let cookies = new Cookies(req, res, [process.env.COOKIE_SECRET]);
		let token = cookies.get('Session', {signed: true});

		try {
			const res = await axios.get(`https://api.bbnknightlife.com/auth/validate/permission?token=${token}&permission=${permission}`);
			shouldRedirect = !(res.data && res.data.valid);

			user = res.data.user;
		} catch (error) {
			console.log(error);
			shouldRedirect = true;
		}

		if (shouldRedirect) {
			res.writeHead(302, {Location: redirect});
			res.end();
		} else {
			return user;
		}
	} else {
		// Client side
		try {
			const res = await axios.get(`https://api.bbnknightlife.com/auth/validate/permission?permission=${permission}`);
			shouldRedirect = !(res.data && res.data.valid);

			user = res.data.user;
		} catch (error) {
			console.log(error);
			shouldRedirect = true
		}

		if (shouldRedirect) {
			Router.push(redirect);
		} else {
			return user;
		}
	}
};