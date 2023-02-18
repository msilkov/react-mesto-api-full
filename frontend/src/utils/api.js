import { BASE_URL } from './utils.js';

class Api {
	constructor({ baseUrl, credentials, headers }) {
		this._baseUrl = baseUrl;
		this._credentials = credentials;
		this._headers = headers;
	}

	_onResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	}

	_request(url, options) {
		return fetch(url, options).then(this._onResponse);
	}

	getUserInfo() {
		return this._request(`${this._baseUrl}/users/me`, {
			method: 'GET',
			credentials: this._credentials,
			headers: this._headers,
		});
	}

	getCards() {
		return this._request(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: this._credentials,
			headers: this._headers,
		});
	}

	addCard({ name, link }) {
		return this._request(`${this._baseUrl}/cards`, {
			method: 'POST',
			credentials: this._credentials,
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		});
	}

	deleteCard(cardId) {
		return this._request(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			credentials: this._credentials,
			headers: this._headers,
			body: JSON.stringify({ cardId }),
		});
	}

	setUserInfo({ name, about }) {
		return this._request(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			credentials: this._credentials,
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		});
	}

	setAvatar({ avatar }) {
		return this._request(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			credentials: this._credentials,
			headers: this._headers,
			body: JSON.stringify({ avatar }),
		});
	}

	toggleCardLikeStatus(cardId, isOwnLiked) {
		return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: `${isOwnLiked ? 'DELETE' : 'PUT'}`,
			credentials: this._credentials,
			headers: this._headers,
			body: JSON.stringify(),
		});
	}
}

const api = new Api({
	baseUrl: BASE_URL,
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
