const minWidth = 650;
const linerMinWidth = 625;

export default (props) => (
	<div id="layout-minwidth" className="layout">
		{ props.children }
		<style jsx global>{`
			body, .minWidth {
				min-width: ${ minWidth }px;
			}

			.linerMinWidth {
				min-width: ${ linerMinWidth }px;
			}
		`}</style>
	</div>
);