export const SnackBar = (snackBarContent) => {
  const content = snackBarContent;

  const contentElement = document.getElementById("snackBarContent");
  if (contentElement) {
    contentElement.textContent = content;
  } else {
    console.error('Element with id "snackBarContent" not found.');
  }

  return document.body.innerHTML;
};

export default SnackBar;
