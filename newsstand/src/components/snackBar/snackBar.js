import { createElement } from '../../app/createElement.js';

export const SnackBar = () => {
  return {
    element: `
    <div class="snackBar" id="snackBarContent"> 내가 구독한 언론사에 추가되었습니다.</div>
  `
  };
};

export default SnackBar;