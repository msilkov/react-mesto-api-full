import PopupWithForm from "./PopupWithForm.js";
import InputText from "./InputText.js";
import InputLink from "./InputLink.js";

import { useEffect, useState } from "react";

export default function AddPlacePopup(props) {
	const initialFormValues = {
		name: "",
		link: "",
	};

	function handleFormSubmit(e) {
		e.preventDefault();
		props.onAddPlace({
			name: formValues.name,
			link: formValues.link,
		});
	}

	const [formValues, setformValues] = useState(initialFormValues);

	useEffect(() => {
		setformValues(initialFormValues);
	}, [props.isOpen]);

	function handleChange(e) {
		const { name, value } = e.target;

		setformValues((oldValues) => ({
			...oldValues,
			[name]: value,
		}));
	}

	return (
		<PopupWithForm
			name="add-card"
			title="Новое место"
			button="Создать"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleFormSubmit}
			popupContainer="popup__container"
		>
			<InputText
				id="place-input"
				type="text"
				name="name"
				className="popup__input popup__input_type_img-title"
				placeholder="Описание места"
				value={formValues.name}
				minLength={2}
				maxLength={30}
				required={true}
				onChange={handleChange}
			/>
			<InputLink
				id="img-input"
				type="url"
				name="link"
				className="popup__input popup__input_type_img-link"
				placeholder="Ссылка на картинку"
				value={formValues.link}
				pattern="https?://.+"
				required={true}
				onChange={handleChange}
			/>
		</PopupWithForm>
	);
}
