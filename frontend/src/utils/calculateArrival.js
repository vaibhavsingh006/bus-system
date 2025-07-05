export function calculateArrival(startTime = "00:00", duration = "0h 0m") {
  try {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [durationHour, durationMinute] = duration.match(/\d+/g).map(Number);

    const date = new Date();
    date.setHours(startHour || 0);
    date.setMinutes(startMinute || 0);
    date.setHours(date.getHours() + (durationHour || 0));
    date.setMinutes(date.getMinutes() + (durationMinute || 0));

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  } catch (err) {
    return "N/A";
  }
}
