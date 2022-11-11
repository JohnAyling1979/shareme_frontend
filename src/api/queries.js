const pinData = `{
	image {
		asset -> {
			url
		}
	},
	_id,
	destination,
	postedBy -> {
		_id,
		_userName,
		image
	},
	save[] {
		_key,
		postedBy -> {
			_id,
			userName,
			image
		},
	},
}`

export const userQuery = userId => {
	return `*[_type == 'user' && _id == '${userId}']`;
}

export const searchQuery = searchTerm => {
	return `*[_type == 'pin' && title match '${searchTerm}' || catefory match '${searchTerm}' || about match '${searchTerm}'] ${pinData}`;
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) ${pinData}`;
