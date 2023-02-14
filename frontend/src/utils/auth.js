import { BASE_URL } from './utils.js';

const request = ({
	url,
	method = 'POST',
	credentials = 'same-origin',
	data,
}) => {
	return fetch(`${BASE_URL}${url}`, {
		method,
		credentials,
		headers: {
			'Content-Type': 'application/json',
		},
		...(!!data && { body: JSON.stringify(data) }),
	}).then((res) =>
		res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	);
};

export const register = (password, email) => {
	return request({
		url: '/signup',
		data: { password, email },
	});
};

export const authorize = (password, email) => {
	return request({
		url: '/signin',
		credentials: 'include',
		data: { password, email },
	});
};

export const getCurrentUser = () => {
	return request({
		url: '/users/me',
		method: 'GET',
		credentials: 'include',
	});
};
