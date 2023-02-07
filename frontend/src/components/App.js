import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { currentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

function App() {
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

	const [isImagePopupOpen, setImagePopupOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);

	const [currentUser, setCurrentUser] = useState({});

	const [cards, setCards] = useState([]);

	const history = useHistory();

	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

	const [isRequestStatus, setRequestStatus] = useState(false);

	const [isLoggedIn, setLoggedIn] = useState(false);

	const [email, setEmail] = useState("");

	useEffect(() => {
		if (isLoggedIn) {
			api
				.getUserInfo()
				.then((userData) => {
					setCurrentUser(userData);
				})
				.catch((err) => {
					console.log(`Ошибка при загрузке данных с сервера: ${err}`);
				});

			api
				.getCards()
				.then((cards) => {
					setCards(cards);
				})
				.catch((err) => {
					console.log(`Ошибка при загрузке карточек с сервера: ${err}`);
				});
		}
	}, [isLoggedIn]);

	useEffect(() => {
		tokenCheck();
	}, []);

	function handleLogin(password, email) {
		auth
			.authorize(password, email)
			.then((data) => {
				if (!data) {
					return Promise.reject("No data!");
				}
				localStorage.setItem("jwt", data.token);
				setLoggedIn(true);
				tokenCheck();
				history.push("/");
			})
			.catch((err) => {
				console.log(`Что-то пошло не так: ${err}`);
			});
	}

	function handleLogout() {
		localStorage.removeItem("jwt");
		setEmail("");
	}

	function handleRegister(password, email) {
		auth
			.register(password, email)
			.then(() => {
				setRequestStatus(true);
				handleInfoTooltip();
				history.push("/sign-in");
			})
			.catch((err) => {
				console.log(`Что-то пошло не так: ${err}`);
				setRequestStatus(false);
				handleInfoTooltip();
			});
	}

	function tokenCheck() {
		if (!localStorage.getItem("jwt")) return;

		const jwt = localStorage.getItem("jwt");

		auth
			.getContent(jwt)
			.then((res) => {
				if (res) {
					setEmail(res.data.email);
					setLoggedIn(true);
					history.push("/");
				}
			})
			.catch((err) => {
				console.log(`Что-то пошло не так: ${err}`);
			});
	}

	function handleCardLike(card, isOwnLiked) {
		api
			.toggleCardLikeStatus(card._id, isOwnLiked)
			.then((newCard) => {
				setCards(
					cards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
				);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных с сервера: ${err}`);
			});
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				const updCards = cards.filter((oldCard) => oldCard._id !== card._id);
				setCards(updCards);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных с сервера: ${err}`);
			});
	}

	function clearCardDelay() {
		setSelectedCard(null);
	}

	function closeAllPopups() {
		setImagePopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setEditAvatarPopupOpen(false);
		setInfoTooltipOpen(false);
		setTimeout(clearCardDelay, 500);
	}

	function handleInfoTooltip() {
		setInfoTooltipOpen(true);
	}

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard);
		setImagePopupOpen(true);
	}

	function handleUpdateUser(userInfo) {
		api
			.setUserInfo(userInfo)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных пользователя: ${err}`);
			});
	}

	function handleUpdateUserAvatar(avatarInfo) {
		api
			.setAvatar(avatarInfo)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке аватара пользователя: ${err}`);
			});
	}

	function handleAddPlaceSubmit(CardData) {
		api
			.addCard(CardData)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке карточек с сервера: ${err}`);
			});
	}

	return (
		<currentUserContext.Provider value={currentUser}>
			<div className="page__content">
				<Header userEmail={email} onLogout={handleLogout} />

				<Switch>
					<ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
						<Main
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							cards={cards}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>
					</ProtectedRoute>

					<Route path="/sign-up">
						<Register onRegister={handleRegister} />
					</Route>
					<Route path="/sign-in">
						<Login onLogin={handleLogin} />
					</Route>
					<Route>
						{isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
					</Route>
				</Switch>

				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateUserAvatar}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>

				<PopupWithForm
					name="confirmation"
					title="Вы уверены?"
					button="Да"
					popupContainer="popup__container"
					popupContent="popup__container_content_confirmation"
					onClose={closeAllPopups}
				/>

				<ImagePopup
					name="zoom-img"
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isImagePopupOpen}
				/>

				<InfoTooltip
					name="infoTooltip"
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
					request={isRequestStatus}
				/>
			</div>
		</currentUserContext.Provider>
	);
}

export default App;
