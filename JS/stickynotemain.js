window.onload = function(){

    const $body = document.querySelector('body');
    let cursorx;
    let cursory;
    let count = 1;
    // 마우스 위치 찾기
    $body.addEventListener("mousemove", (event) => {
        cursorx = `${event.pageY}px`;
        cursory = `${event.pageX}px`;
    });

    // 우클릭시 해당 포인터에 메모생성
    document.addEventListener('mousedown', (event) => {
        if ((event.button == 2) || (event.which == 3)) {
                addnote();
            }
        });

    // 기본 우클릭 기능제거
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    
}