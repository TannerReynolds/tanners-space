export function getDomainAvatar() {
	const domain = window?.location?.hostname ?? '';
	if (domain.includes('namijas')) return 'namija.jpg';
	return 'tanner.jpg';
}
