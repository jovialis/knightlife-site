import Head from 'next/head';

import Splash from '../layouts/splash';

export default () => (
	<Splash clear={true}>
		<Head>
			<title>Login</title>
		</Head>
		<div className='flex-container'>
			<h2>Login</h2>
			<GoogleButton id='google' href='https://api.bbnknightlife.com/auth/google'/>
		</div>
		<style jsx>{`
			h2 {
				text-align: center;
			}
		`}</style>
	</Splash>
)

const GoogleButton = (props) => {
	return (
		<div className="component-google">
			<a href={props.href}>
				<div className='google-scaffold'>
					<div className='google-section-left google-section'>
						<img src='/static/img/google.png' alt='Google Logo'/>
					</div>
					<div className='google-section-right google-section'>
						<span>Sign in with Google</span>
					</div>
				</div>
			</a>
			<style jsx>{`
				.component-google {
				    height: 50px;
				    width: 230px;

				    background-color: #F7F7F8;

				    border: 1px solid #EFEFF4;
				    border-radius: 5px;
				}

				.component-google:hover {
				    border: 1px solid #DCDCE3;
				}

				.component-google a {
				    display: block;

				    height: 100%;
				    width: 100%;

				    text-decoration: none;
				}

				.component-google .google-scaffold {
				    height: 100%;
				    width: 100%;

				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				}

				.component-google .google-section {
				    height: 100%;

				    margin-left: 20px;

				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;

				    -webkit-box-align: center;
				    -ms-flex-align: center;
				    align-items: center;
				}

				/* Left section
				*************/

				.component-google .google-section-left img {
				    max-height: 50%;
				}

				/* Right section
				*************/

				.component-google .google-section-right span {
				    font-family: sans-serif;
				    font-weight: 500;

				    color: #8E8E9F;
				}
			`}</style>
		</div>
	);
};