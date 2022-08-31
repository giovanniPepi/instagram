const getTime = (unix) => {
  const formattedTime = new Date(unix * 1000);
  const now = new Date();
  const diff = formattedTime - now;
  const diffFormatted = new Date(diff).getHours();
  console.log(diffFormatted);

  switch (diffFormatted) {
    case diffFormatted <= 24:
      return `${diffFormatted} hours`;
    case diffFormatted > 24:
      return `${(diffFormatted / 24).toFixed(1)} days`;
    default:
      return `${diffFormatted} hours`;
  }
};

export default getTime;
