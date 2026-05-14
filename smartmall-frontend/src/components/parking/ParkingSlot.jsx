function ParkingSlot({ slot, onToggle }) {
	return (
		<button
			type="button"
			onClick={() => onToggle?.(slot)}
			className={`rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
				slot.occupied
					? "border-red-400/30 bg-red-400/10 text-red-100"
					: "border-teal-400/30 bg-teal-400/10 text-teal-100"
			}`}
		>
			<p className="text-xs uppercase tracking-[0.3em] opacity-70">Slot</p>
			<h3 className="mt-2 text-xl font-semibold">{slot.slotNumber}</h3>
			<p className="mt-1 text-sm opacity-80">Level {slot.level}</p>
			<p className="mt-3 text-sm font-medium">{slot.occupied ? "Occupied" : "Available"}</p>
		</button>
	);
}

export default ParkingSlot;
