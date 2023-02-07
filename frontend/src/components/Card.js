import { useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card(props) {
	const currentUser = useContext(currentUserContext);

	const isOwn = props.card.owner._id === currentUser._id;

	const cardDeleteButtonClassName = `card__remove-btn ${
		isOwn ? "card__remove-btn_type_visible" : "card__remove-btn_type_hidden"
	}`;

	const isOwnLiked = props.card.likes.some((i) => i._id === currentUser._id);

	const cardLikeButtonClassName = `${
		isOwnLiked ? "card__like-btn card__like-btn_active" : "card__like-btn"
	}`;

	function handleImgClick() {
		props.onClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card, isOwnLiked);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	return (
		<article className="card">
			<img
				onClick={handleImgClick}
				src={props.card.link}
				alt={props.card.alt || props.card.name}
				className="card__image"
			/>
			<div className="card__description">
				<h2 className="card__title">{props.card.name}</h2>
				<div className="card-likes">
					<button
						onClick={handleLikeClick}
						type="button"
						className={cardLikeButtonClassName}
					/>
					<p
						className={`card__like-counter ${
							props.card.likes.length ? " card__like-counter_active" : ""
						}`}
					>
						{props.card.likes.length}
					</p>
				</div>
			</div>
			<button
				onClick={handleDeleteClick}
				type="button"
				className={cardDeleteButtonClassName}
			/>
		</article>
	);
}
