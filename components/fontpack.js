import Head from 'next/head';

export default () => (
	<div id="font-loader">
		<style jsx global>{`
		@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900|Open+Sans:400,600,700');

		body, p, span, .font-body {
			font-family: 'Open Sans', sans-serif;
			font-weight: 400;
		}

		h1, h2, h3, h4, h5, h6, .font-header {
			font-family: 'Lato', sans-serif;
		}
		`}</style>
	</div>
);