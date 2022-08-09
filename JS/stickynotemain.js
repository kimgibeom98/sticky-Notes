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

     // 메모추가 함수
     function addnote(){
        let newdiv = document.createElement("div");
        newdiv.classList.add(`note-box${count}`);
    
        let clisediv = document.createElement("div");
        let closebtn = document.createElement("button");
        let closetxt = document.createTextNode('X'); 

        closebtn.appendChild(closetxt);
        closebtn.onclick = delnote;

        clisediv.appendChild(closebtn);

        let newtextarea = document.createElement("textarea");
        newtextarea.placeholder = '메모를 입력하세요...';
    
        newdiv.appendChild(clisediv);
        newdiv.appendChild(newtextarea);
        $body.appendChild(newdiv);
        
        newdiv.style.top = cursorx;
        newdiv.style.left = cursory;
        
        count ++;
    }

      // 메모삭제 함수
      function delnote(){
        this.parentNode.parentNode.remove();
    }

    
}