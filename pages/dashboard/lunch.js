import {default as DashboardLayout, HeaderTitleContent} from '../../layouts/dashboard';
import Head from "next/head";

export default () => (
	<DashboardLayout headerContent={ ( <HeaderTitleContent title="Lunch Menu"/> ) }>
		<Head>
			<title key="title">Dashboard - Lunch</title>
		</Head>
		<div id="">

		</div>
		<style jsx>{`

		`}</style>
	</DashboardLayout>
);

const LunchItem = (item) => (
	<div className="lunch-item">
		<div id="">

		</div>
		<style jsx>{`
			.lunch-item {
				display: flex;
			}
		`}</style>
	</div>
);