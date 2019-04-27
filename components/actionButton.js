export default (props) => (
	<div id="action-button">
		<button onClick={props.onClick}>{ props.title }</button>
		<style jsx>{`
			button {
				padding: 5px 10px 5px 10px;

			    color: white;

			    font-size: 14px;
			    font-weight: 600;

			    text-transform: uppercase;

			    background-color: #4481EB;

			    border: 1px solid #3667BC;
				border-radius: 3px;
			}

			button:hover {
			    background-color: #3667bc;
			    cursor: pointer;
			}
		`}</style>
	</div>
);