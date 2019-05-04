import Head from 'next/head';
import React from 'react';
import Router from 'next/router';

import axios from 'axios';
import Cookies from 'cookies';

import {default as DashboardLayout, HeaderProfileContent, HeaderTitleContent} from '../layouts/dashboard';

export default class extends React.Component {

	static async getInitialProps({req, res}) {
		let cookies = new Cookies(req, res, [process.env.COOKIE_SECRET]);

		let token = cookies.get('Session', {signed: true});
		// token = 'eb348436-cd74-496e-be6a-f8421ffb3e45';

		const {userData} = await axios.get(`https://api.bbnknightlife.com/user/about?token=${ token }`);
		// const {moduleData} = await axios.get(`https://api.bbnknightlife.com/user/modules?token=${ token }`);

		return {
			user: userData.user,
			// modules: moduleData.modules
		};
	}

	render() {
		return (
			<DashboardLayout headerContent={(<HeaderProfileContent name={this.props.user.name} id={this.props.user.username} imgUrl={this.props.user.image}/>)}>
				<Head>
					<title key="title">Dashboard</title>
				</Head>
			</DashboardLayout>
		);
	}

}