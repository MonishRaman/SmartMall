import { useEffect, useState } from "react";
import ParkingMap from "../../components/parking/ParkingMap";
import parkingService from "../../services/parkingService";
import { compactNumber, percent } from "../../utils/dashboardData";

function Parking() {
	const [slots, setSlots] = useState([]);

	useEffect(() => {
		parkingService.listSlots()
			.then(({ data }) => setSlots(data || []))
			.catch(() => undefined);
	}, []);

	const occupied = slots.filter((slot) => slot.occupied).length;
	const available = Math.max(0, slots.length - occupied);

	const handleToggle = async (slot) => {
		await parkingService.setOccupied(slot.id, !slot.occupied);
		setSlots((current) => current.map((item) => (item.id === slot.id ? { ...item, occupied: !item.occupied } : item)));
	};

	return (
		<section className="space-y-6">
			<div className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 p-6">
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Parking</h1>
				<p className="mt-2 text-sm text-slate-300">Slot occupancy is fetched from the database and can be updated live.</p>
				<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(available)} open</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{percent(occupied, slots.length)} occupied</span>
				</div>
			</div>
			<ParkingMap slots={slots} onToggle={handleToggle} />
		</section>
	);
}

export default Parking;
