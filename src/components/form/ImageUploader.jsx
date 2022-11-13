import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Spinner from '../Spinner';
import { uploadPinImage } from '../../api/api';

export const ImageUploader = ({ imageRef }) => {
	const [imageError, setImageError] = useState();
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState();

	const uploadImage = e => {
		console.log('e.target.files', e.target.files);
		if (e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			const { type, name } = selectedFile;

			if (
				type === 'image/png' ||
				type === 'image/svg' ||
				type === 'image/jpeg' ||
				type === 'image/tiff' ||
				type === 'image/gif'
			) {
				setImageError(null);
				setLoading(true);

				uploadPinImage(selectedFile, type, name, document => {
					setImage(document);
					setLoading(false);
				})
			} else {
				setImageError('Image type is not supported');
			}
		}
	}
	imageRef.current = image;
	return (
		<div className='flex flex-col lg:flex-row justify-center items-center bg-white p-3 lg:p-5 w-full lg:w-4/5'>
			<div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
				<div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
					{loading && <Spinner />}
					{imageError && <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>{imageError}</p>}
					{!image ? (
						<label>
							<div className='flex flex-col items-center justify-center h-full'>
								<div className='flex flex-col justify-center items-center'>
									<p className='font-bold text-2xl'>
										<AiOutlineCloudUpload />
									</p>
									<p className='text-lg'>Click to upload</p>
								</div>
								<p className='mt-32 text-gray-400'>
									use high-quality JPG, SVG, PNG, or GIF less than 20 MB
								</p>
							</div>
							<input
								className='w-0 h-0'
								type='file'
								onChange={uploadImage}
							/>
						</label>
					) : (
						<div className='relative h-full'>
							<img className='h-full w-full' src={image.url } alt='uploaded' />
							<button
								type='button'
								className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shodow-md transition-all duration-500 ease-in-out'
								onClick={() => setImage(null)}
							>
								<MdDelete />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}