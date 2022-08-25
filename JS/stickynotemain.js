let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let notecontent;

function render() {
  const createDiv = document.createElement("div");
  const headbox = document.createElement("div");
  const closebtn = document.createElement("button");
  const closetxt = document.createTextNode('X');
  const newtextarea = document.createElement("textarea");

  newtextarea.placeholder = '메모를 입력하세요...';  
  
  closebtn.appendChild(closetxt);
  createDiv.appendChild(headbox);
  createDiv.appendChild(closebtn);
  createDiv.appendChild(newtextarea);
  document.body.appendChild(createDiv);
  
  createDiv.style.top = cursory;
  createDiv.style.left = cursorx;
}

function onMousedown(event) {
  if (event.button == 2) {
    render();
  } else if (event.target.tagName === 'BUTTON') {
    event.target.parentNode.remove();
  } else if (event.button === 0 && event.target.tagName === 'DIV') {
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
  const movetarget = document.querySelector('body > div:last-of-type');
  cursorx = `${event.pageX}px`;
  cursory = `${event.pageY}px`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY - 8}px`;
    movetarget.style.left = `${event.pageX - findX - 8}px`;
  }
  notecontent = document.body.innerHTML;
  localStorage.setItem("notefull", notecontent);
}

const fullbox = localStorage.getItem('notefull');
document.body.innerHTML = fullbox;

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);