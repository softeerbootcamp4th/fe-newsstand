export function addEventToRollingBox(state) {
    let indexPointer = {
        leftAnimationIndex: 0,
        rightAnimationIndex: 0
    };

    initializeData(indexPointer, state.previewArticleData);
    addPauseEvent();
    addRollingEvent(indexPointer, state.previewArticleData);
}

function initializeData(indexPointer, previewArticleData) {
    const {
        left_rotating_string_list,
        right_rotating_string_list
    } = previewArticleData;

    document.querySelector('#rotate_left_roll_in_content').innerHTML = left_rotating_string_list[indexPointer.leftAnimationIndex];
    document.querySelector('#rotate_right_roll_in_content').innerHTML = right_rotating_string_list[indexPointer.rightAnimationIndex];
}

function handleChangeLeftRotating(indexPointer, left_rotating_string_list) {
    indexPointer.leftAnimationIndex += 1;
    indexPointer.leftAnimationIndex %= 5;

    const tmp = document.querySelector('#rotate_left_roll_in_content').innerHTML;
    document.querySelector('#rotate_left_roll_out_content').innerHTML = tmp;
    document.querySelector('#rotate_left_roll_in_content').innerHTML = left_rotating_string_list[indexPointer.leftAnimationIndex];
}

function handleChangeRightRotating(indexPointer, right_rotating_string_list) {
    indexPointer.rightAnimationIndex += 1;
    indexPointer.rightAnimationIndex %= 5;

    const tmp = document.querySelector('#rotate_right_roll_in_content').innerHTML;
    document.querySelector('#rotate_right_roll_out_content').innerHTML = tmp;
    document.querySelector('#rotate_right_roll_in_content').innerHTML = right_rotating_string_list[indexPointer.rightAnimationIndex];
}

function addPauseEvent() {
    document.querySelectorAll('.rotating_box').forEach(box => {
        box.addEventListener('mouseenter', function () {
            document.querySelectorAll('#rotating_left').forEach(aniBox => {
                aniBox.style.animationPlayState = 'paused';
            });
            document.querySelectorAll('#rotating_right').forEach(aniBox => {
                aniBox.style.animationPlayState = 'paused';
            });
        });

        box.addEventListener('mouseleave', function () {
            document.querySelectorAll('#rotating_left').forEach(aniBox => {
                aniBox.style.animationPlayState = 'running';
            });
            document.querySelectorAll('#rotating_right').forEach(aniBox => {
                aniBox.style.animationPlayState = 'running';
            });
        });
    });
}

function addRollingEvent(indexPointer, previewArticleData) {
    const {
        left_rotating_string_list,
        right_rotating_string_list
    } = previewArticleData;
    
    document.querySelector('#rotating_left').addEventListener("animationstart", function () {
        handleChangeLeftRotating(indexPointer, left_rotating_string_list);
    });
    document.querySelector('#rotating_left').addEventListener("animationiteration", function () {
        handleChangeLeftRotating(indexPointer, left_rotating_string_list);
    });
    document.querySelector('#rotating_right').addEventListener("animationstart", function () {
        handleChangeRightRotating(indexPointer, right_rotating_string_list);
    });
    document.querySelector('#rotating_right').addEventListener("animationiteration", function () {
        handleChangeRightRotating(indexPointer, right_rotating_string_list);
    });
}