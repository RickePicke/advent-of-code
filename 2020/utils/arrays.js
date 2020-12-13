const equals = (arr1, arr2) => {
  return arr1.length === arr2.length && arr1.every((x, i) => x === arr2[i]);
};

module.exports = {
  equals,
};
