import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import config from './config';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<GoogleOAuthProvider clientId={config.google.id}>
		<Router>
			<App />
		</Router>
	</GoogleOAuthProvider>
);
