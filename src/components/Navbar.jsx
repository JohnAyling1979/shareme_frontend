import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Navbar = ({ searchTermRef }) => {
	const user = useContext(UserContext);
	const navigate = useNavigate();

	if (!user) {
		return null;
	}

	return (
		<div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
			<div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
				<IoMdSearch className='ml-1' fontSize={21}/>
				<input
					className='p-2 w-full bg-white outline-none'
					type='text'
					placeholder='Search'
					onFocus={() => navigate('/search')}
					onChange={e => searchTermRef.current = e.target.value}
				/>
			</div>
			<div className='flex gap-3'>
				<Link className='hidden md:block' to={`user-profile/${user._id}`}>
					<img className='w-14 h-12 rounded-lg' src={user.image} alt='user' />
				</Link>
				<Link className='bg-black text-white rounded-lg w-12 md:w-14 h-12 flex justify-center items-center' to='create-pin'>
					<IoMdAdd />
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
