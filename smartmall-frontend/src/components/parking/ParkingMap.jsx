import ParkingSlot from "./ParkingSlot";

function ParkingMap({ slots = [], onToggle }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{slots.map((slot) => (
				<ParkingSlot key={slot.id} slot={slot} onToggle={onToggle} />
			))}
		</div>
	);
}

export default ParkingMap;
