let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let savenote;

const arr = []

// localStorage.setItem("key", arr);

function render(){
    const addnote = document.querySelector('body').innerHTML = arr.map((content) => `<div style="left:${content.left}px; top:${content.top}px"><div></div><button>X</button><textarea style="width:${content.width}px; height:${content.width}px;"></textarea></div>`);
}



function onMousedown(event) {
  if (event.button == 2) {
    arr.push({width : 200, height : 116, left : cursorx, top : cursory})
    render();
  } else if (event.target.tagName === 'BUTTON') {
    console.log(arr)
    event.target.parentNode.remove();
    arr.finIndex((i) => event.target)
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
  cursorx = `${event.pageX}`;
  cursory = `${event.pageY}`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY - 8}px`;
    movetarget.style.left = `${event.pageX - findX - 8}px`;
  }

  savenote = document.body.innerHTML;
  localStorage.setItem("stickynote", savenote);
}

const savekey = localStorage.getItem('stickynote');
document.body.innerHTML = savekey;

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);