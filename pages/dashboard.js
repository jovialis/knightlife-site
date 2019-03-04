import Head from 'next/head';

import { default as DashboardLayout, HeaderProfileContent, HeaderTitleContent } from '../layouts/dashboard';

export default () => (
	<DashboardLayout headerContent={ ( <HeaderProfileContent name="Dylan Hanson" id="chanson@bbns.org" imgUrl="/static/img/profileSample.jpg"/> ) }>
		<Head>
			<title key="title">Dashboard</title>
		</Head>
	</DashboardLayout>
);