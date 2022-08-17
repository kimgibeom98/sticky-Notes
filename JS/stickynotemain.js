let cursorx;
let cursory;

// const menunote = [];
const arr = [];
const notes = JSON.parse(localStorage.getItem('notes')) ?? [];
// 마우스 위치 찾기
document.addEventListener("mousemove", (event) => {
  cursorx = `${event.pageY}px`;
  cursory = `${event.pageX}px`;
});
// 메모생성
document.addEventListener('mousedown', (event) => {
  if (event.button == 2) {
    addnote();
    render();
  }
});

// 기본 우클릭 기능제거
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// 메모생성 함수
function render() {
  const addnote = document.querySelector('#wrap').innerHTML = arr.map((content) => `${content}`)
  console.log(arr)


  let notecontent = document.body.innerHTML;
  localStorage.setItem("notefull", notecontent);
}

function addnote(){
    let plusnote = `<div class="note-box" style="left:${cursory}; top:${cursorx}"><div></div><button>X</button><textarea placeholder="메모를 입력하세요..."></textarea></div>`
    arr.push(plusnote);
    
//     render();
//     const newdiv = document.createElement("div");
//     newdiv.classList.add(`note-box${count}`,`common-box`);

//     const topbox = document.createElement("div");
//     const closebtn = document.createElement("button");
//     const closetxt = document.createTextNode('X');

//     topbox.classList.add('move-div');

//     closebtn.appendChild(closetxt);
//     closebtn.classList.add(`close-btn`);

//     const newtextarea = document.createElement("textarea");
//     newtextarea.placeholder = '메모를 입력하세요...';

//     newdiv.appendChild(topbox);
//     newdiv.appendChild(closebtn);
//     newdiv.appendChild(newtextarea);

//     document.body.appendChild(newdiv);
//     document.querySelector('#wrap').innerHTML = `<div class="note-box"><div></div><button>X</button><textarea placeholder="메모를 입력하세요..."></textarea></div>`

//     delnote(closebtn);
//     drageEvent(newdiv,topbox,newtextarea);
//     let notecontent = document.body.innerHTML;
//     localStorage.setItem("notefull", notecontent);
}

// let fullbox = localStorage.getItem('notefull');    
// document.body.innerHTML = fullbox;
// localStorage.clear();

// 메모삭제 함수
function delnote(closttarget) {
  closttarget.addEventListener('click', (event) => {
    event.target.parentNode.remove();
  })
}

// 드래그 & 드랍 함수
function drageEvent(parentBox, moveTop, firsttextarea) {
  let isDragging;
  let findX;
  let findY;

  // 내용 수정시 최상단으로 나옴
  firsttextarea.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
      document.body.append(parentBox);
      firsttextarea.focus();
    }
  });

  moveTop.addEventListener('mousedown', drageStart);
  document.addEventListener('mouseup', drageEnd);
  document.addEventListener('mousemove', drageMove);
  // 드래그 시작
  function drageStart(event) {
    if (event.button === 0) {
      findX = event.pageX - moveTop.getBoundingClientRect().left;
      findY = event.pageY - moveTop.getBoundingClientRect().top;
      isDragging = true
      document.body.append(parentBox);
    }
  }

  // 드래그 끝
  function drageEnd() {
    isDragging = false
  }

  // 드래그 진행중
  function drageMove(event) {
    if (isDragging) {
      parentBox.style.top = `${event.pageY - findY}px`;
      parentBox.style.left = `${event.pageX - findX}px`;
    }
  }
}

