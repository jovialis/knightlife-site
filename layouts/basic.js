import Head from 'next/head';
import FontPack from '../components/fontpack';

import MinWidthLayout from './minWidth';
import Navigation from '../components/navigation';

export default (props) => (
	<MinWidthLayout id="layout-basic" className="layout">
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta charSet="utf-8"/>
		</Head>
		<Navigation/>
		<div id="container">{ props.children }</div>
		<FontPack/>
		<style jsx global>{`
			body {
				background-color: white;
				margin: 0;
			}
		`}</style>
	</MinWidthLayout>
);