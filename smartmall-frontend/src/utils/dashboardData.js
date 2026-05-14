const weekdayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const compactFormatter = new Intl.NumberFormat("en-IN", {
	notation: "compact",
	maximumFractionDigits: 1,
});

export function compactNumber(value) {
	const numericValue = Number(value || 0);
	return compactFormatter.format(Number.isFinite(numericValue) ? numericValue : 0);
}

export function sumBy(items = [], selector = (item) => item) {
	return items.reduce((total, item) => total + Number(selector(item) || 0), 0);
}

export function averageBy(items = [], selector = (item) => item) {
	if (!items.length) {
		return 0;
	}

	return sumBy(items, selector) / items.length;
}

export function percent(part, total, precision = 0) {
	const denominator = Number(total || 0);
	if (!denominator) {
		return "0%";
	}

	const ratio = (Number(part || 0) / denominator) * 100;
	return `${ratio.toFixed(precision)}%`;
}

export function buildWeeklySeries(items = [], dateKey, valueSelector, valueKey) {
	const totals = Object.fromEntries(weekdayOrder.map((day) => [day, 0]));

	items.forEach((item) => {
		const date = new Date(item?.[dateKey]);
		if (Number.isNaN(date.getTime())) {
			return;
		}

		const day = weekdayOrder[date.getDay()];
		totals[day] += Number(valueSelector(item) || 0);
	});

	return weekdayOrder.map((name) => ({
		name,
		[valueKey]: Number(totals[name].toFixed(2)),
	}));
}

export function sortByDateDesc(items = [], dateKey) {
	return [...items].sort((left, right) => new Date(right?.[dateKey] || 0) - new Date(left?.[dateKey] || 0));
}

export function formatRelativeTime(value) {
	if (!value) {
		return "Just now";
	}

	const timestamp = new Date(value).getTime();
	if (Number.isNaN(timestamp)) {
		return "Just now";
	}

	const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
	if (elapsedSeconds < 60) {
		return `${elapsedSeconds || 1}s ago`;
	}

	const elapsedMinutes = Math.floor(elapsedSeconds / 60);
	if (elapsedMinutes < 60) {
		return `${elapsedMinutes}m ago`;
	}

	const elapsedHours = Math.floor(elapsedMinutes / 60);
	if (elapsedHours < 24) {
		return `${elapsedHours}h ago`;
	}

	const elapsedDays = Math.floor(elapsedHours / 24);
	return `${elapsedDays}d ago`;
}