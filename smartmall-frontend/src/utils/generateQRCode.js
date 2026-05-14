export function generateQRCode(text, size = 220) {
	const encoded = encodeURIComponent(text ?? "");
	return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`;
}
