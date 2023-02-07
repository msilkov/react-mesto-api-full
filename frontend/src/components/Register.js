import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialUserData = {
	email: "",
	password: "",
};

export default function Register(props) {
	const [userData, setUserData] = useState(initialUserData);

	function handleChange(e) {
		const { name, value } = e.target;
		setUserData((oldData) => ({
			...oldData,
			[name]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		const { password, email } = userData;

		if (!password || !email) return;

		props.onRegister(password, email);
	}

	return (
		<section className="register section section_size_narrow page__section">
			<h2 className="register__title">Регистрация</h2>
			<div className="register__content">
				<form className="register__form" onSubmit={handleSubmit}>
					<input
						id="email-input"
						type="email"
						name="email"
						value={userData.email}
						onChange={handleChange}
						className="register__input"
						placeholder="Email"
						minLength={2}
						maxLength={30}
						required=""
					/>
					<input
						id="password-input"
						type="password"
						name="password"
						value={userData.password}
						onChange={handleChange}
						className="register__input"
						placeholder="Пароль"
						minLength={2}
						maxLength={30}
						required=""
					/>
					<button type="submit" className="register__submit-btn">
						Зарегистрироваться
					</button>
				</form>
				<div className="register__signin">
					<p className="register__login-text">Уже зарегистрированы?&nbsp;</p>
					<Link to="sign-in" className="register__login-link">
						Войти
					</Link>
				</div>
			</div>
		</section>
	);
}
