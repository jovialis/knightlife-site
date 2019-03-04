import Basic from './basic';

const bumperWidth = "70%";

const headerHeight = "130px";
const headerMargin = "120px";

const DashboardLayout = (props) => (
	<Basic>
		<div id="layout-dashboard" className="layout">
			<div id="header">
				<div className="bumper linerMinWidth">
					{ props.headerContent }
				</div>
			</div>
			<div id="container">
				<div className="bumper linerMinWidth">
					{ props.children }
					hi
				</div>
			</div>
		</div>
		<style jsx>{`
		#header {
			position: relative;

			width: 100%;
			height: ${headerHeight};

			margin-bottom: ${headerMargin};

			background-color: #EFEFF4;
			border-bottom: 1px solid #DCDCE0;
		}

		.bumper {
			position: relative;
			margin: auto;

			width: ${ bumperWidth };
			height: 100%;
		}
		`}</style>
	</Basic>
);

const profilePicHeight = "140px";
const profileInfoOffsetLeft = "20px";
const profileInfoOffsetBottom = "10px";
const profileInfoTextSeparation = "2px";

const HeaderProfileContent = (props) => (
	<div id="layout-header-profile" className="layout">
		<img id="profile-pic" src={ props.imgUrl }></img>
		<div id="profile-info">
			<div id="name"><span>{ props.name }</span></div>
			<div id="id"><span>{ props.id }</span></div>
		</div>
		<div id="profile-actions">

		</div>
		<style jsx>{`
		#profile-pic {
			position: absolute;
			bottom: 0;

			transform: translateY(40%);

			width: ${ profilePicHeight };
			height: ${ profilePicHeight };

			border-radius: calc(${ profilePicHeight } / 2);
			border: 1px solid #DCDCE0;
		}

		#profile-info {
			position: absolute;
			bottom: ${ profileInfoOffsetBottom };

			left: calc(${profilePicHeight} + ${profileInfoOffsetLeft});
		}

		#profile-info #name {
			margin-bottom: ${ profileInfoTextSeparation };
		}

		#profile-info #name span {
			font-size: 22px;
			font-weight: 600;

			color: #707083;
		}

		#profile-info #id span {
			font-size: 12px;
			font-weight: 500;

			color: #AEAEC1;
		}
		`}</style>
	</div>
);

const HeaderTitleContent = (props) => (
	<div id="layout-header-title" className="layout">
		<div id="title">
			{ props.title }
		</div>
		<style jsx>{`
		#title {
			position: absolute;
			bottom: 0;


		}
		`}</style>
	</div>
);

export { DashboardLayout as default, HeaderProfileContent, HeaderTitleContent };