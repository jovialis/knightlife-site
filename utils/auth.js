import Router from 'next/router'

import axios from 'axios';

axios.defaults.withCredentials = true;

import Cookies from "cookies";

export const authenticationHeaders = async (req) => {
	if (req) {
		// Must fetch cookies from user
		// Server side
		let cookies = new Cookies(req, res);

		let token = cookies.get('Session');
		let tokenSig = cookies.get('Session.sig');

		return {
			'Session': token ? token : '',
			'Session.sig': tokenSig ? tokenSig : ''
		};
	} else {
		// No Headers needed since User's cookies will be sent automatically
		return {};
	}
};

export const requireLogin = async (req, res, redirect) => {
	let shouldRedirect;
	let user;

	if (req) {
		// Server side
		let cookies = new Cookies(req, res);

		let token = cookies.get('Session');
		let tokenSig = cookies.get('Session.sig');

		try {
			const res = await axios.get(`https://api.bbnknightlife.com/auth/validate`, {
				headers: {
					'Session': token ? token : '',
					'Session.sig': tokenSig ? tokenSig : ''
				}
			});

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
		let cookies = new Cookies(req, res);

		let token = cookies.get('Session');
		let tokenSig = cookies.get('Session.sig');

		try {
			const res = await axios.get(`https://api.bbnknightlife.com/auth/validate/permission?permission=${permission}`, {
				headers: {
					'Session': token ? token : '',
					'Session.sig': tokenSig ? tokenSig : ''
				}
			});

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