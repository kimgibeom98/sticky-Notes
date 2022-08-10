window.onload = function(){

    let cursorx;
    let cursory;
    let count = 1;
    // 마우스 위치 찾기
    document.addEventListener("mousemove", (event) => {
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
        const newdiv = document.createElement("div");
        newdiv.classList.add(`note-box${count}`);
    
        const topbox = document.createElement("div");
        const closebtn = document.createElement("button");
        const closetxt = document.createTextNode('X'); 

        closebtn.appendChild(closetxt);
        closebtn.onclick = delnote;

        const newtextarea = document.createElement("textarea");
        newtextarea.placeholder = '메모를 입력하세요...';
    
        newdiv.appendChild(topbox);
        newdiv.appendChild(closebtn);
        newdiv.appendChild(newtextarea);
        document.body.appendChild(newdiv);
        
        newdiv.style.top = cursorx;
        newdiv.style.left = cursory;

        // 내용 수정시 최상단으로 나옴
        newtextarea.addEventListener('mousedown', () => {
            console.log(newdiv.closest(this.parentNode))
            document.body.append(newdiv);
        });


        count ++;

        // 드래그앤 드랍
        let isDragging;
        let findX;
        let findY;

        topbox.addEventListener('mousedown', drageStart);
        document.addEventListener('mouseup', drageEnd);
        document.addEventListener('mousemove', drageMove);

        // 드래그 시작
        function drageStart(event){
            if(event.button === 0){
                findX = event.pageX - topbox.getBoundingClientRect().left;
                findY = event.pageY - topbox.getBoundingClientRect().top;
                isDragging = true
                document.body.append(newdiv);
            }
        }

        // 드래그 끝
        function drageEnd(){
            isDragging = false
        }

        // 드래그 진행중
        function drageMove(event){
            if(isDragging){
                newdiv.style.top = `${event.pageY - findY}px`;
                newdiv.style.left = `${event.pageX - findX}px`;
            }
        }

    }

    // 메모삭제 함수
    function delnote(){
        this.parentNode.remove();
    }

 


}