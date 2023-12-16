function timeAgo(dateString) {
  const currentDate = new Date();
  const pastDate = new Date(dateString);

  const timeDifference = currentDate - pastDate;
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
      return `${years} y`;
  } else if (months > 0) {
      return `${months} m`;
  } else if (weeks > 0) {
      return `${weeks} w`;
  } else if (days > 0) {
      return `${days} d`;
  } else if (hours > 0) {
      return `${hours} h`;
  } else {
      return `${minutes + 1} m`;
  }
}

export default timeAgo;