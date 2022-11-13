import { client } from '../client';
import { userQuery, searchQuery, feedQuery } from './queries';
import { v4 as uuidv4 } from 'uuid';

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

export const savePost = async (postId, userId, callback) => {
	const result = await (client.patch(postId)
		.setIfMissing({ save: [] })
		.insert('after', 'save[-1]', [{
			_key: uuidv4(),
			userId,
			postedBy: {
				_type: 'postedBy',
				_ref: userId
			}
		}]).commit());

	callback(result);
}

export const deletePin = async (postId, callback) => {
	const result = await client.delete(postId);

	callback(result);
}