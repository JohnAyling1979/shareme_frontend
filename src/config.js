const config = {
	google: {
		id: process.env.REACT_APP_GOOGLE_ID,
	},
	sanity: {
		projectId: process.env.REACT_APP_SANITY_ID,
		dataset: process.env.REACT_APP_SANITY_DATASET,
		apiVersion: process.env.REACT_APP_GOOGLE_API_VERSION,
		useCdn: process.env.REACT_APP_GOOGLE_USE_CDN === 'true',
		token: process.env.REACT_APP_SANITY_TOKEN,
	},
}

export default config;
