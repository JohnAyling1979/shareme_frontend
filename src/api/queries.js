const pinData = `{
	image {
		asset -> {
			url
		}
	},
	_id,
	title,
	destination,
	postedBy -> {
		_id,
		userName,
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
	return `*[_type == 'pin' && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}'] ${pinData}`;
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) ${pinData}`;
