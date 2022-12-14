import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';

import logo from '../assets/logo.png';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { categories } from '../constant';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 boarder-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({closeToggle}) => {
	const user = useContext(UserContext);
	const handleCloseSidebar = () => {
		if (closeToggle) {
			closeToggle(false);
		}
	}

	const renderedCategories = categories.slice(0, categories.length - 1);

	return (
		<div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
			<div className='flex flex-col'>
				<Link
					to='/'
					className='flex px-5 gap-2 my-6 pt-1 w-190 item-center'
					onClick={handleCloseSidebar}
				>
					<img className='w-full' src={logo} alt='logo' />
				</Link>
				<div className='flex flex-col gap-5'>
					<NavLink
						to='/'
						className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
						onClick={handleCloseSidebar}
					>
						<RiHomeFill />Home
					</NavLink>
					<h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
					{renderedCategories.map(category => (
						<NavLink
							to={`/category/${category.name}`}
							key={category.name}
							className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
							onClick={handleCloseSidebar}
						>
							{category.name}
						</NavLink>
					))}
				</div>
			</div>
			{user && (
				<Link
					to={`user-profile/${user._id}`}
					className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
					onClick={handleCloseSidebar}
				>
					<img className='w-10 h-10 rounded-full' src={user.image} alt='user' /><p>{user.userName}</p>
				</Link>
			)}
		</div>
	);
}

export default Sidebar;