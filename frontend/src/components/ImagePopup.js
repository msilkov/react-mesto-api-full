import Popup from "./Popup";

export default function ImagePopup(props) {
	return (
		<Popup
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			}`}
			onClose={props.onClose}
			isOpen={props.isOpen}
		>
			<div className="popup__container popup__container_content_image">
				<img
					className="popup__img"
					src={props.card?.link}
					alt={props.card?.name}
				/>
				<p className="popup__img-desc">{props.card?.name}</p>
				<button
					onClick={props.onClose}
					type="reset"
					className="popup__close-btn"
				/>
			</div>
		</Popup>
	);
}
