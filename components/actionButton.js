export default (props) => (
	<div id="action-button">
		<button onClick={props.onClick} className={props.enabled ? 'enabled' : 'disabled'}>{ props.title }</button>
		<style jsx>{`
			button {
				padding: 5px 10px 5px 10px;

			    font-size: 14px;
			    font-weight: 600;

			    text-transform: uppercase;

				border-radius: 3px;
			}

			button.enabled {
				background-color: #4481EB;
			    border: 1px solid #3667BC;

                color: white;
			}

			button.enabled:hover {
			    background-color: #3667bc;
			    cursor: pointer;
			}

			button.disabled {
				border: 1px solid #DCDCE3;
				background-color: #F7F7F8;

				color: #8E8E9F;
			}

			button.disabled:hover {
				cursor: not-allowed;
			}


		`}</style>
	</div>
);