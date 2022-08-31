let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let savenote;
let data = [];
// data = localStorage.getItem('stickynote') ?? [];


function render(){
  document.querySelector('body').innerHTML = data.map((content) => `<div class="note-box" style="left:${content.left}px; top:${content.top}px"><div></div><button>X</button><textarea style="width:${content.width}px; height:${content.height}px;"></textarea></div>`);
}

function onMousedown(event) {
  if (event.button == 2) {
    data.push({width : 200, height : 116, left : cursorx, top : cursory})
    render();
  } else if (event.target.tagName === 'BUTTON') {
    event.target.parentNode.remove();
  } else if (event.button === 0 && event.target.tagName === 'DIV') {
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().left;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().top;
    isDragging = true
    document.body.append(event.target.parentNode);
  }
  savenote = document.body.innerHTML;
  localStorage.setItem("stickynote", savenote);
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
  savenote = document.body.innerHTML;
  localStorage.setItem("stickynote", savenote);
}

function onKeyup(event){
  if(event.target.tagName === 'TEXTAREA'){
    data.push({width : event.target.offsetWidth, height : event.target.offsetHeight, left : findbox.getBoundingClientRect().left, top : findbox.getBoundingClientRect().top} );
  }
}


const savekey = localStorage.getItem('stickynote');
document.body.innerHTML = savekey;

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);