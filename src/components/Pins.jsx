import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePin from './CreatePin';
import Feed from './Feed';
import Navbar from './Navbar';
import PinDetail from './PinDetail';
import Search from './Search';

const Pins = ({ user }) => {
	const searchTermRef = useRef('');

	return (
		<div className='px-2 md:px-5'>
			<div className='bg-gray-50'>
				<Navbar user={user} searchTermRef={searchTermRef} />
			</div>
			<div className='h-full'>
				<Routes>
					<Route path='/' element={<Feed />} />
					<Route path='/category/:categoryId' element={<Feed />} />
					<Route path='/pin-detail/:pinId' element={<PinDetail user={user} />} />
					<Route path='/create-pin' element={<CreatePin user={user} />} />
					<Route path='/search' element={<Search searchTermRef={searchTermRef} />} />
				</Routes>
			</div>
		</div>
	);
}

export default Pins;
