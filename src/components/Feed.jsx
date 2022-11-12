import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPins } from "../api/api";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
	const [loading, setLoading] = useState(true);
	const [pins, setPins] = useState([]);
	const { categoryId } = useParams();

	useEffect(() => {
		setLoading(true);

		fetchPins(categoryId, (pins) => {
			setPins(pins);
			setLoading(false);
		});
	}, [categoryId]);

	if (loading) {
		return <Spinner message='We are adding new ideas to your feed!'/>
	}

	return (
		<div>
			<MasonryLayout pins={pins} />
		</div>
	);
}

export default Feed;
