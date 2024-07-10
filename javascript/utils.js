/*
* 다른 함수에서 필요한 유틸함수 정의
*/

/*
* 클래스 이름으로 부모 찾기
*/
export function findParentWithClass(element, className) {
	while (element && element != document.body) {
		if (element.classList.contains(className))
			return (element);
		element = element.parentElement;
	}
	return (null);
}
