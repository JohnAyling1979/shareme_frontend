import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';

import { urlFor } from '../client';

const Pin = ({ pin: { title, postedBy, image, _id, destination } }) => {
	const [postHovered, setPostHovered] = useState(true);
	const alreadySaved = [];

	const navigate = useNavigate();

	console.log(postHovered);
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
							{alreadySaved.length === 0 ? (
								<button>
								Save
							</button>
						) : (
								<button>
									Saved
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Pin;
