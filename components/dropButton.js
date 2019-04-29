import Feather from "feather-icons";

export default (props) => (
	<div id="action-button">
		<button onClick={props.onClick}><div id='icon' dangerouslySetInnerHTML={{__html: Feather.icons[props.icon].toSvg()}}></div><div id='title'>{ props.title }</div></button>
		<style jsx>{`
			button {
				padding: 5px 10px 5px 10px;

			    color: #8E8E9F;

			    font-size: 14px;
			    font-weight: 400;

			    text-transform: uppercase;

			    background-color: #F7F7F8;

			    border: 1px solid #DCDCE3;
				border-radius: 3px;

				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			button:hover {
			    background-color: #DCDCE3;
			    cursor: pointer;
			}

			#icon {
				margin-right: 5px;
			}

			#title {
				margin-bottom: 2px;
			}
		`}</style>
	</div>
);