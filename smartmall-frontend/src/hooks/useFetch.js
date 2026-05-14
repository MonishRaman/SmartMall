import { useEffect, useState } from "react";

export function useFetch(fetcher, dependencies = []) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		const run = async () => {
			try {
				setLoading(true);
				const result = await fetcher();
				if (mounted) {
					setData(result);
				}
			} catch (err) {
				if (mounted) {
					setError(err);
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		};

		run();

		return () => {
			mounted = false;
		};
	}, dependencies);

	return { data, loading, error, setData };
}

export default useFetch;
