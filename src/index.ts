const run = async () => {
  const year = process.env.YEAR || process.argv[2];
  const day = process.env.DAY || process.argv[3];
  if (!day || !year) {
    !day && console.log('😩 No day provided.');
    !year && console.log('😩 No year provided.');
  } else {
    console.log(`./${year}/${day.padStart(2, '0')}`);
    await import(`./${year}/${day.padStart(2, '0')}`);
  }
};

run();
