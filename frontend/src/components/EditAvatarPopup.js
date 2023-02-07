import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import InputLink from "./InputLink.js";

export default function EditAvatarPopup(props) {
	const inputLink = useRef("");
	const [link, setLink] = useState("");

	useEffect(() => {
		setLink("");
	}, [props.isOpen]);

	function handleFormSubmit(e) {
		e.preventDefault();
		props.onUpdateAvatar({
			avatar: inputLink.current.value,
		});
		inputLink.current.value = "";
	}
	function handlePlaceLinkChange(e) {
		setLink(e.target.value);
	}

	return (
		<PopupWithForm
			name="edit-avatar"
			title="Обновить аватар"
			button="Сохранить"
			popupContainer="popup__container"
			popupContent="popup__container_content_edit-avatar"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleFormSubmit}
		>
			<InputLink
				id="owner-avatar"
				type="url"
				name="avatar"
				className="popup__input popup__input_type_img-link"
				placeholder="Ссылка на картинку"
				ref={inputLink}
				value={link}
				pattern="https?://.+"
				required={true}
				onChange={handlePlaceLinkChange}
			/>
		</PopupWithForm>
	);
}
