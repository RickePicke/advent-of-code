function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function betweenOrEquals(min, max, number) {
  return number >= min && number <= max;
}

module.exports = {
  sleep,
  betweenOrEquals,
};
