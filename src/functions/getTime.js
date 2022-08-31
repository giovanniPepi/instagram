const getTime = (unix) => {
  const formattedTime = new Date(unix * 1000);
  const now = new Date();
  const diff = formattedTime - now;
  const diffFormatted = new Date(diff).getSeconds();
  console.log(diffFormatted);

  /*   https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript */

  /*   switch (diffFormatted) {
    case diffFormatted <= 24:
      return `${diffFormatted} hours`;
    case diffFormatted > 24 && diffFormatted <= 720:
      return `${(diffFormatted / 24).toFixed(1)} days`;
    case diffFormatted > 720 && diffFormatted <= 1440:
      return `${(diffFormatted / 720).toFixed(1)} month`;
    case diffFormatted > 1440 && diffFormatted <= 17280:
      return `${(diffFormatted / 720).toFixed(1)} months`;
    case diffFormatted > 17280 && diffFormatted <= 34560:
      return `${(diffFormatted / 17280).toFixed(1)} year`;
    case diffFormatted > 34560:
      return `${(diffFormatted / 17280).toFixed(1)} years`;
    default:
      return `${diffFormatted} hours`;
  } */
};

export default getTime;
