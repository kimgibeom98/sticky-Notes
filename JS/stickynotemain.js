let cursorx;
let cursory;
let isDragging;
let findX;
let findY;

// 메모 만드는 함수
function render() {
  const newdiv = document.createElement("div");
  newdiv.classList.add(`note-box`);

  const topbox = document.createElement("div");
  const closebtn = document.createElement("button");
  const closetxt = document.createTextNode('X');

  topbox.classList.add('move-div');

  closebtn.appendChild(closetxt);
  closebtn.classList.add(`close-btn`);

  const newtextarea = document.createElement("textarea");
  newtextarea.placeholder = '메모를 입력하세요...';

  newdiv.appendChild(topbox);
  newdiv.appendChild(closebtn);
  newdiv.appendChild(newtextarea);

  document.body.appendChild(newdiv);
  newdiv.style.top = cursorx;
  newdiv.style.left = cursory;

  let notecontent = document.body.innerHTML;
  localStorage.setItem("notefull", notecontent);
}

let fullbox = localStorage.getItem('notefull');
document.body.innerHTML = fullbox;
localStorage.clear();


// 기본 우클릭 기능제거
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// 드래그앤드롭, 마우스포인터 위치 확인
document.addEventListener("mousemove", (event) => {
  cursorx = `${event.pageY}px`;
  cursory = `${event.pageX}px`;

  if (isDragging) {
    event.target.parentNode.style.top = `${event.pageY - findY}px`;
    event.target.parentNode.style.left = `${event.pageX - findX}px`;
  }
});

// 드래그앤드롭, 메모생성, 메모삭제
document.addEventListener('mousedown', (event) => {
  if (event.button == 2) {
    render();
  } else if (event.target.tagName === 'BUTTON') {
    event.target.parentNode.remove();
  } else if (event.button === 0 && event.target.tagName === "DIV") {
    isDragging = true
    document.body.append(event.target.parentNode);
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().left;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().top;
  }
});

// 드래그앤드롭, textarea클릭시 최상단으로
document.addEventListener('mouseup', (event) => {
  isDragging = false
  if (event.button === 0 && event.target.tagName === 'TEXTAREA') {
    document.body.append(event.target.parentNode);
    event.target.focus();
  }
});
