import Head from 'next/head';

import Splash from '../layouts/splash';

export default () => (
	<div>
		<Splash>
			<Head>
				<title>Knight Life</title>
			</Head>
			<div id="box">
				<div id="content-wrapper" className="box-wrapper">
					<div id="text-wrapper">
						<h1>KNIGHT LIFE</h1>
						<h2>BB&N's Official Student App</h2>
					</div>
					<div id="text-bottom-pad"></div>
					<div>
						<ul>
							<li>Blocks</li>
							<li>Events</li>
							<li>Menus</li>
							<li>News</li>
							<li>Color Wars</li>
						</ul>
					</div>
				</div>
				<div id="img-wrapper" className="box-wrapper">
					<img src="/static/img/screenshot@2x.png"/>
				</div>
			</div>
		</Splash>
		<style jsx>{`
			#box {
				height: 100%;

				display: flex;
				align-items: center;
			}

			.box-wrapper {
				margin-left: 20px;
				margin-right: 20px;
			}

			#content-wrapper {
				float: left;
				position: relative;

				text-align: center;

				color: white;
			}

			#text-wrapper h1 {
				font-size: 42px;
				font-weight: 900;

				margin: 0;
			}

			#text-wrapper h2 {
				font-size: 24px;
				font-weight: 700;
			}

			#text-bottom-pad {
				height: 20px;
				width: 1px;
			}

			ul {
				position: absolute;

				left: 50%;
				transform: translateX(-50%);

				padding: 0;

				white-space: nowrap;
			}

			ul li {
				display: inline-block;

				list-style-type: none;

				margin: 10px;

				white-space: nowrap;
			}

			#img-wrapper {
				height: 100%;
				float: right;
			}

			img {
				height: 100%;
			}
		`}</style>
	</div>

);