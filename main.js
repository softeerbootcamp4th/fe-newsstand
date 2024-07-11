import { initializeData, initializeEvent, initializeScreen } from "./scripts/initialize.js";
import { TIME, TOGGLE } from "./scripts/magicNumber.js";
import store from "./scripts/store.js";


initializeData()
.then(_ => {
    initializeEvent();
    initializeScreen();
})




// 스코프 체인 
// 스코프 
// 함수 내부에서 선언한 지역변수에 다른 디펜던시가 발생하면 해당 변수는 스택에 있는 지역변수에서 스코프 체인이라는 자료구조로 넘어감 (소유권 이전과 비슷함)
// 나머지 디펜던시가 다 종료되면 스코프 체인에서 삭제됨

// const test_instance = test();

// console.log(test_instance.get_value())
// test_instance.set_value(10)
// console.log(test_instance.get_value())



// function test(ptr_obj) {
//     setTimeout(() => {
//         console.log(ptr_obj)
//     },1000);
// }

// function outer_func() {
//     const pointer_1 = { value: 1 };
//     test(pointer_1);
// }

// const pointer_2 = { value: 2 };
// test(pointer_2);