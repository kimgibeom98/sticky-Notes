let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let notecontent;

// 메모 만드는 함수
function render() {
  const newdiv = document.createElement("div");
  newdiv.classList.add('.note-box');

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
  newdiv.style.top = cursory;
  newdiv.style.left = cursorx;

}



// 기본 우클릭 기능제거
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);

function onMousedown(event) {
  if (event.button == 2) {
    render();
  } else if (event.target.tagName === 'BUTTON') {
    event.target.parentNode.remove();
  } else if (event.button === 0 && event.target.tagName === 'DIV') {
    console.log(123)
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().left;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().top;
    isDragging = true
    document.body.append(event.target.parentNode);
  }

  notecontent = document.body.innerHTML;
  localStorage.setItem("notefull", notecontent);
}

function onMouseup(event){
  isDragging = false
  if (event.button === 0 && event.target.tagName === 'TEXTAREA') {
    document.body.append(event.target.parentNode);
    event.target.focus();
  }
}

function onMousemove(event){
  let movetarget = document.querySelector('body > div:last-of-type');
  cursorx = `${event.pageX}px`;
  cursory = `${event.pageY}px`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY}px`;
    movetarget.style.left = `${event.pageX - findX}px`;
  }
  notecontent = document.body.innerHTML;
  localStorage.setItem("notefull", notecontent);
}

const fullbox = localStorage.getItem('notefull');
document.body.innerHTML = fullbox;

localStorage.clear();

