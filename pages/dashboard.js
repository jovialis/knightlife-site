import Head from 'next/head';
import React from 'react';

import axios from 'axios';
axios.defaults.withCredentials = true;

import Cookies from 'cookies';

import { requireLogin } from '../utils/auth';

import {default as DashboardLayout, HeaderProfileContent } from '../layouts/dashboard';

export default class extends React.Component {

	static async getInitialProps({req, res}) {
		const user = await requireLogin(req, res, '/login');

		return {
			user: user,
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