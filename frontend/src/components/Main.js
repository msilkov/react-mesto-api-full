import { useContext } from "react";
import Card from "./Card.js";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
	const currentUser = useContext(currentUserContext);

	return (
		<main className="content section">
			<section
				className="profile section section_size_narrow page__section"
				aria-label="Секция профиль пользователя"
			>
				<div className="profile__avatar-wrapper">
					<img
						src={currentUser.avatar}
						alt="аватарка"
						className="profile__avatar"
					/>
					<div className="profile__avatar-overlay">
						<button
							type="button"
							className="profile__avatar-btn"
							onClick={props.onEditAvatar}
						/>
					</div>
				</div>
				<div className="profile__info">
					<div className="profile__name-wrapper">
						<h1 className="profile__name">{currentUser.name}</h1>
						<button
							type="button"
							className="profile__edit-btn"
							onClick={props.onEditProfile}
						/>
					</div>
					<p className="profile__desc">{currentUser.about}</p>
				</div>
				<button
					type="button"
					className="profile__add-btn"
					onClick={props.onAddPlace}
				/>
			</section>
			<section
				className="cards-layout section section_size_narrow page__section"
				aria-label="Блок с фотокарточками"
			>
				{props.cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onClick={props.onCardClick}
						onCardLike={props.onCardLike}
						onCardDelete={props.onCardDelete}
					/>
				))}
			</section>
		</main>
	);
}
