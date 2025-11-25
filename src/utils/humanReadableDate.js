const humanReadableDate = (dateString) => {
    const date = new Date(dateString);
    const inIndianTime = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return inIndianTime;
}
export default humanReadableDate;