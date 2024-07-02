export function addEventToRotatingBox() {
    let left_animation_index = 0;
    let right_animation_index = 0;

    let left_rotating_string_list = [
        "LEFT [1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "LEFT [2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "LEFT [3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "LEFT [4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "LEFT [5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
    ];

    let right_rotating_string_list = [
        "RIGHT [1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "RIGHT [2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "RIGHT [3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "RIGHT [4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
        "RIGHT [5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
    ];

    //초기값 갱신
    document.querySelector('#rotate_left_roll_in_content').innerHTML = left_rotating_string_list[left_animation_index];
    document.querySelector('#rotate_right_roll_in_content').innerHTML = right_rotating_string_list[right_animation_index];

    //데이터 갱신
    function handleChangeLeftRotating() {
        left_animation_index+=1;
        left_animation_index%=5;
        let tmp = document.querySelector('#rotate_left_roll_in_content').innerHTML;
        document.querySelector('#rotate_left_roll_out_content').innerHTML = tmp;
        document.querySelector('#rotate_left_roll_in_content').innerHTML = left_rotating_string_list[left_animation_index];
    }

    function handleChangeRightRotating() {
        right_animation_index+=1;
        right_animation_index%=5;
        let tmp = document.querySelector('#rotate_right_roll_in_content').innerHTML;
        document.querySelector('#rotate_right_roll_out_content').innerHTML = tmp;
        document.querySelector('#rotate_right_roll_in_content').innerHTML = right_rotating_string_list[right_animation_index];
    }


    //pause evet 총 4개
    document.querySelectorAll('.rotating_box').forEach(box => {
        box.addEventListener('mouseenter', function() {
            document.querySelectorAll('#rotating_left').forEach(aniBox => {
                aniBox.style.animationPlayState = 'paused';
            });
            document.querySelectorAll('#rotating_right').forEach(aniBox => {
                aniBox.style.animationPlayState = 'paused';
            });
        });
        box.addEventListener('mouseleave', function() {
            document.querySelectorAll('#rotating_left').forEach(aniBox => {
                aniBox.style.animationPlayState = 'running';
            });
            document.querySelectorAll('#rotating_right').forEach(aniBox => {
                aniBox.style.animationPlayState = 'running';
            });
        });
    });   

    document.querySelector('#rotating_left').addEventListener("animationstart",function() {
        handleChangeLeftRotating();
    });
    document.querySelector('#rotating_left').addEventListener("animationiteration",function() {
        handleChangeLeftRotating();
    });
    document.querySelector('#rotating_right').addEventListener("animationstart",function() {
        handleChangeRightRotating();
    });
    document.querySelector('#rotating_right').addEventListener("animationiteration",function() {
        handleChangeRightRotating();
    });

}
