import Head from 'next/head';
import React from 'react';
import Router from 'next/router';

import axios from 'axios';
import cookies from 'cookies';

import {default as DashboardLayout, HeaderProfileContent, HeaderTitleContent} from '../layouts/dashboard';

export default class extends React.Component {

	static async getInitialProps({req}) {
		const token = req.cookies.get('Session', {signed: true});
		const {data} = await axios.get(`https://api.bbnknightlife.com/user/about?token=${ token }`);

		return {
			user: data
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