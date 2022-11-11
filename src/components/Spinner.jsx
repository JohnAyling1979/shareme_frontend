import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
	return (
		<div className="flex flex-col gap-5 justify-center items-center w-full h-full">
			<Circles
				height="50"
				color='#00BFFF'
			/>
			<p className='text-lg'>{message}</p>
		</div>
	);
}

export default Spinner;
