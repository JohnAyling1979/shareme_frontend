import { client } from '../client';
import { userQuery, searchQuery, feedQuery } from './queries';

export const fetchUser = async (id, callback) => {
	const users = await client.fetch(userQuery(id));

	callback(users[0]);
}

export const fetchPins = async (categoryId, callback) => {
	let pins = [];
	let query = feedQuery;

	if (categoryId) {
		query = searchQuery(categoryId);
	}

	pins = await client.fetch(query);

	callback(pins);
}