import Head from 'next/head';
import React from 'react';

import axios from 'axios';
import feather from 'feather-icons';

axios.defaults.withCredentials = true;

import Cookies from 'cookies';

import {requireLogin, authenticationHeaders} from '../utils/auth';

import {default as DashboardLayout, HeaderProfileContent} from '../layouts/dashboard';

export default class extends React.Component {

	static async getInitialProps({req, res}) {
		const user = await requireLogin(req, res, '/login');

		const modules = (await axios.get('https://api.bbnknightlife.com/d/user/modules', {
			headers: authenticationHeaders(req, res)
		})).data.modules;

		return {
			user: user,
			modules: modules
		};
	}

	render() {
		return (
			<DashboardLayout headerContent={(<HeaderProfileContent name={this.props.user.name} id={this.props.user.username} imgUrl={this.props.user.image}/>)}>
				<Head>
					<title key="title">Dashboard</title>
				</Head>
				<div id='module-wrapper'> {
					this.props.modules.length === 0 ?
						(<h5>You don't have permission for any modules. Please contact an administrator if you think this is a mistake.</h5>)
						:
						(this.props.modules.map(m => <DashboardModule module={m}/>))
				} </div>
			</DashboardLayout>
		);
	}

}

const DashboardModule = (props) => (
	<div className='module' id={`module-${props.module.id}`}>
		<a href={`/dashboard/${props.module.id}`}>
			<div className='bumper'>
				<div className='icon-wrapper part' dangerouslySetInnerHTML={{__html: feather.icons[props.module.icon].toSvg()}}/>
				<div className='body part'>
					<span>{props.module.name}</span>
				</div>
			</div>
		</a>
		<style jsx>{`
			.module {
			    border: 1px solid #EFEFF4;
			    border-radius: 3px;

			    background-color: #F7F7F8;

			    margin-top: 5px;
			    margin-bottom: 5px;

			    height: 50px;
			}

			.module:hover {
			    border: 1px solid #DCDCE3;
			}

			.module a {
			    text-decoration: none;

			    height: 100%;
			    width: 100%;
			}

			.module .bumper {
			    height: 100%;
			    width: 100%;

			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;

			    -webkit-box-align: center;
			    -ms-flex-align: center;
			    align-items: center;
			}


			.module .part {
			    margin-left: 15px;

			    color: #8E8E9F;

			    text-decoration: none;

			    font-family: sans-serif;
			    font-size: 16px;
			}

			.module .part:first-child {
			    margin-left: 20px;
			}
		`}</style>
	</div>
);