import { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import logo from '../assets/logo.png';
import { Sidebar, UserProfile, Pins } from '../components';
import { fetchUser } from '../api/api';
import UserContext from '../context/UserContext';

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [user, setUser] = useState(undefined);
	const scrollRef = useRef();

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));

		if (localUser) {
			fetchUser(localUser._id, setUser);
		}
	}, []);

	useEffect(() => {
		scrollRef.current.scrollTo(0,0);
	})

	return (
		<UserContext.Provider value={user}>
			<div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
				<div className='hidden md:flex h-screen flex-initial'>
					<Sidebar />
				</div>
				<div className='flex md:hidden flex-row'>
					<div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>

					<HiMenu className='cursor-pointer' fontSize={40} onClick={() => setToggleSidebar(true)} />
					<Link to='/'>
						<img src={logo} alt='logo' className='w-28' />
					</Link>
					<Link to={`user-profile/${user?._id}`}>
						<img src={user?.image} alt='logo' className='w-28' />
					</Link>
					</div>
					{toggleSidebar && (
					<div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
						<div className='absolute w-full flex justify-end items-center p-2'>
							<AiFillCloseCircle className='cursor-pointer' fontSize={30} onClick={() => setToggleSidebar(false)} />
						</div>
						<Sidebar closeToggle={setToggleSidebar} />
					</div>
				)}
				</div>
				<div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
					{user && (
						<Routes>
							<Route path='/user-profile/:userId' element={<UserProfile />} />
							<Route path='/*' element={<Pins />} />
						</Routes>
					)}
				</div>
			</div>
		</UserContext.Provider>
	);
}

export default Home;
