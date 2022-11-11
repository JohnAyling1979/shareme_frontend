import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPins } from "../api/api";
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

	return (<div>Feed</div>);
}

export default Feed;
