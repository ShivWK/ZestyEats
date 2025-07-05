const calDistance = (latRestro, latCurrent, lngRestro, lngCurrent) => {
    const R = 6371;
    const toRadians = (deg) => (deg * Math.PI) / 180;

    const dLat = toRadians(latRestro - latCurrent);
    const dLng = toRadians(lngRestro - lngCurrent);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(latRestro)) * Math.cos(toRadians(latCurrent)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export default calDistance;