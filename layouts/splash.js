import Head from 'next/head';
import FontPack from '../components/fontpack';

import Navigation from '../components/navigation';

export default (props) => (
	<div id="layout-splash" className="layout">
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" key="viewport"/>
			<meta charSet="utf-8" key="meta"/>
		</Head>
		<FontPack/>
		<Navigation id="navigation" hideBackground={!props.clear} absolute={true}/>
		<div id="container" className={ (props.clear) ? 'background-clear' : 'background-gradient' }>
			<div id="wrapper">
				{props.children}
			</div>
		</div>
		<style jsx global>{`
			body {
				background-color: white;
				margin: 0;
			}

			#navigation {
				z-index: 2;
			}
		`}</style>
		<style jsx>{`
			#container {
				width: 100%;
				height: 100vh;
			}

			#container.background-gradient {
				background-color: #4481eb;

				background: rgb(68,129,235);
				background: -webkit-gradient(linear, left top, right top, from(rgba(68,129,235,1)), to(rgba(4,190,254,1)));
				background: linear-gradient(90deg, rgba(68,129,235,1) 0%, rgba(4,190,254,1) 100%);
			}

			#wrapper {
				position: relative;

				height: 100%;
				width: 100%;

				display: flex;
				align-items: center;
				justify-content: center;
			}
		`}</style>
	</div>
);