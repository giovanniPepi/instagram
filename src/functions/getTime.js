const getTime = (unix) => {
  unix = unix * 1000;
  /*   https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript */

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours()
    );
    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate(),
      b.getHours()
    );
    return (utc2 - utc1) / _MS_PER_DAY;
  };

  const a = new Date(unix);
  const b = new Date();
  const difference = dateDiffInDays(a, b);

  // switch statement doesn't seem to work even with the correct type
  if (difference <= 0.0833) return `${difference * 24} HOUR`;
  else if (difference > 0.0833 && difference <= 1)
    return `${difference * 24} HOURS`;
  else if (difference > 1 && difference <= 1.5)
    return `${difference.toFixed(0)} DAYS`;
  else if (difference > 1.5 && difference <= 7)
    return `${difference.toFixed(0)} DAYS`;
  else if (difference > 7 && difference <= 10)
    return `${(difference / 7).toFixed(0)} WEEK`;
  else if (difference > 10) return `${(difference / 7).toFixed(0)} WEEKS`;
};

export default getTime;
