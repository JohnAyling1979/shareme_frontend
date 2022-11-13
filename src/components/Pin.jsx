import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';

import { urlFor } from '../client';
import UserContext from '../context/UserContext';
import { savePost, deletePin } from '../api/api';

const Pin = ({ pin: { title, postedBy, image, _id, destination, save } }) => {
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const navigate = useNavigate();
	const user = useContext(UserContext);
	const alreadySaved = useMemo(() => save?.filter(save => save.postedBy._id === user._id).length > 0 , [save, user]);

	const onSave = e => {
		console.log('clicked');
		e.stopPropagation();

		if (alreadySaved) {

		} else {
			setSavingPost(true);

			savePost(_id, user._id, result => {
				setSavingPost(false);

				window.location.reload();
			});
		}
	}

	const onDelete = e => {
		e.stopPropagation();

		deletePin(_id, result => {
			window.location.reload();
		});
	}

	return (
		<div className='m-2'>
			<div
				className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`pin-detail/${_id}`)}
				>
				<img className='rounded-lg w-full' alt={title} src={urlFor(image).width(250).url()} />
				{postHovered && (
					<div
						className='absolute top-0 w-full h-full flex flex-col justify-between p-2 pl-1 z-50'
					>
						<div
							className='flex items-center justify-between'
						>
							<div
								className='flex gap-2'
							>
								<a
									className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
									href={`${image.asset.url}?dl=`}
									download
									onClick={e => e.stopPropagation()}
								>
									<MdDownloadForOffline />
								</a>
							</div>
								<button
									type='button'
									className='bg-red-500 opacity-75 hover:opacity-100 hover:shadow-md text-white font-bold px-5 py-1 text-base rounded-3xl outline-none'
									onClick={onSave}
									disabled={savingPost}
								>
									{alreadySaved ? `${save.length} Saved` : 'Save'}
								</button>
						</div>
						<div className='flex justify-between items-center gap-2 w-full'>
							<a
								className='bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
								href={destination}
								target='_blank'
								rel='noreferrer'
								onClick={e => e.stopPropagation()}
							>
								<BsFillArrowUpRightCircleFill />
							</a>
							{postedBy._id === user._id && (
								<button
									className='bg-white opacity-75 p-2 hover:opacity-100 hover:shadow-md font-bold text-dark text-base rounded-3xl outline-none'
									type='button'
									onClick={onDelete}
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link
				className='flex gap-2 mt-2 items-center'
				to={`user-profile/${postedBy._id}`}
			>
				<img
					className='w-8 h-8 rounded-full object-cover'
					src={postedBy.image}
					alt={postedBy.userName}
				/>
				<p className='font-semibold capitalize'>{postedBy.userName}</p>
			</Link>
		</div>
	);
}

export default Pin;
