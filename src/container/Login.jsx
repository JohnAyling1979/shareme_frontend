import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const responseGoogle = async response => {
		if (response.credential) {
			const decodedCredentials = jwt_decode(response.credential);
			const { name, picture, sub } = decodedCredentials;
			const doc = {
				_id: sub,
				_type: 'user',
				userName: name,
				image: picture,
			};

			const user = await client.createIfNotExists(doc)

			localStorage.setItem('user', JSON.stringify(user));

			navigate('/', { replace: true });
		}
	};

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className='relative w-full h-full'>
				<video
					className='w-full h-full object-cover'
					src={shareVideo}
					type='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
				/>
				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
					<div className='p-5'>
						<img src={logo} width='130px' alt='logo' />
					</div>
					<div className='shadow-2x1'>
						<GoogleLogin onSuccess={responseGoogle} onError={() => setError('Problem logging in. Please try again.')}/>
					</div>
					{error && (
						<div className="absolute top-16 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
							<span className="block sm:inline">{error}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Login;
