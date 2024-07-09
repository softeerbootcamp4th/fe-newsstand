export const shortenStr = (str, maxLength = 25) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};
