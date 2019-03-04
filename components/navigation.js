import Link from 'next/link';

export default (props) => (
	<div id='navigation' className={ (props.hideBackground ? 'hide-background' : 'show-background') + " " + (props.absolute ? 'absolute-background' : 'relative-background') }>
		<div className='section section-left'>
			<Link href='/'>
				<a>
					<img src='/static/img/logo.png' alt='Knight Logo'></img>
				</a>
			</Link>
		</div>
		<ul className='section section-right'>
			<li className='segment'>
				<Link href='/'>
					<a>Home</a>
				</Link>
			</li>
			<li className='segment'>
				<Link href='/contact'>
					<a>Contact Us</a>
				</Link>
			</li>
			<li className='segment'>
				<Link href='/dashboard'>
					<a>Dashboard</a>
				</Link>
			</li>
		</ul>
		<style jsx>{`
			#navigation {
				height: 40px;
				width: 100%;
			}

			#navigation.show-background {
				background-color: #4481eb;

				background: rgb(68,129,235);
				background: -webkit-gradient(linear, left top, right top, from(rgba(68,129,235,1)), to(rgba(4,190,254,1)));
				background: linear-gradient(90deg, rgba(68,129,235,1) 0%, rgba(4,190,254,1) 100%);
			}

			#navigation.absolute-background {
				position: absolute;
			}

			#navigation.relative-background {
				position: relative;
			}

			.section {
				height: 100%;
				margin: 0px 10px 0px 10px;
			}

			.section-left {
				float: left;
			}

			.section-left a {
				display: block;
				height: 100%;

				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;

				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
			}

			.section-left img {
				max-height: 60%;
			}

			.section-right {
				float: right;
				list-style-type: none;
			}

			.section-right .segment {
				height: 100%;
				margin: 0px 8px 0px 8px;

				display: inline-block;
			}

			.section-right .segment a {
				position: relative;

				display: block;
				height: 100%;

				color: white;

				font-weight: bolder;

				text-transform: uppercase;
				text-decoration: none;

				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-box;
				display: flex;

				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
			}

			.section-right .segment a::before {
				/* Set up hover underlines */
				content: '';

				position: absolute;

				left: 0;
				bottom: 0;

				width: 100%;
				height: 2px;

				background-color: white;

				opacity: 0;

				-webkit-transition: opacity .2s;
				transition: opacity .2s;
			}

			.section-right .segment a:hover::before {
				opacity: 1;
			}
		`}</style>
	</div>
);