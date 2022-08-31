const getTime = (unix) => {
  /*   https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript */

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  const a = new Date(unix),
    b = new Date(),
    difference = dateDiffInDays(a, b);

  console.log(a, b);

  return difference;
};

export default getTime;
