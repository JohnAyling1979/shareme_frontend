import { useContext, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import UserContext from '../context/UserContext';
import { categories } from '../constant';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { uploadPinImage } from '../api/api';
import { ImageUploader } from './form/ImageUploader';

const CreatePin = () => {
	const [fieldError, setFieldError] = useState(null);

	const titleRef = useRef('');
	const imageRef = useRef('');
	const aboutRef = useRef('');
	const destinationRef = useRef('');
	const categoryRef = useRef(categories[0].name);

	const user = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
			{fieldError && (
				<p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>{fieldError}</p>
			)}
			<ImageUploader imageRef={imageRef} />
		</div>
	);
}

export default CreatePin;
