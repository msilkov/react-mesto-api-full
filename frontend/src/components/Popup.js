export default function Popup(props) {
	function handleOverlay(e) {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	}

	return (
		<article onClick={handleOverlay} className={props.className}>
			{props.children}
		</article>
	);
}

