import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import InputText from "./InputText.js";
import { currentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
	const currentUser = useContext(currentUserContext);

	function handleFormSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	}
	const [name, setName] = useState(" ");
	const [description, setDescription] = useState(" ");

	useEffect(() => {
		setName(currentUser.name || "");
		setDescription(currentUser.about || "");
	}, [currentUser, props.isOpen]);

	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleDescChange(e) {
		setDescription(e.target.value);
	}

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			button="Сохранить"
			popupContainer="popup__container"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleFormSubmit}

		>
			<InputText
				id="name-input"
				type="text"
				name="name"
				className="popup__input popup__input_type_name"
				placeholder="Ваше имя"
				value={name}
				minLength={2}
				maxLength={40}
				required={true}
				onChange={handleNameChange}
			/>
			<InputText
				id="prof-input"
				type="text"
				name="about"
				className="popup__input popup__input_type_profession"
				placeholder="Ваша профессия"
				value={description}
				minLength={2}
				maxLength={200}
				required={true}
				onChange={handleDescChange}
			/>
		</PopupWithForm>
	);
}
