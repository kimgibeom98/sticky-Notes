let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
const data = [];
// const data = localStorage.getItem('stickynote') ?? [];

function render(){
  document.querySelector('body').innerHTML = data.map((content) => `<div class="note-box" style="left:${content.left}; top:${content.top}"><div></div><button class="clost-btn">X</button><textarea placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;"></textarea></div>`);
}

function onMousedown(event) {
  if (event.button == 2) {
    data.push({width : 200, height : 116, left : cursorx, top : cursory})
    render();
  } else if (event.target.getAttribute('class') === 'clost-btn') {
    event.target.parentNode.remove();
  } else if (event.button === 0 && event.target.tagName === 'DIV') {
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().left;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().top;
    isDragging = true
    document.body.append(event.target.parentNode);
  }
  localStorage.setItem("stickynote", data);
}

function onMouseup(event){
  isDragging = false
  if (event.button === 0 && event.target.getAttribute('class') === 'content-box') {
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
  savenote = document.body.innerHTML;
  localStorage.setItem("stickynote", savenote);
}

function onKeyup(event){
  if(event.target.getAttribute('class') === 'content-box'){
    data.push({width : event.target.offsetWidth, height : event.target.offsetHeight, left : findbox.getBoundingClientRect().left, top : findbox.getBoundingClientRect().top} );
  }
}


// document.body.innerHTML = data;

render();

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);