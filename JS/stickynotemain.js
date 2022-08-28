let cursorx;
let cursory;
let isDragging;
let findX;
let findY;

let data;
let arr = []

// localStorage.setItem("key", data);

function render(){
    data =  document.querySelector('body').innerHTML = arr.map((content) => `<div class="note-box" style="left:${content.left}px; top:${content.top}px"><div></div><button>X</button><textarea style="width:${content.width}px; height:${content.height}px;"></textarea></div>`);
    console.log(data)
}

function onMousedown(event) {
  if (event.button == 2){
    arr.push({width : 200, height : 116, left : cursorx, top : cursory})
    render();
  }else if (event.target.tagName === 'BUTTON') {
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

  localStorage.setItem("stickynote", data);
}

function onKeydown(event){
  if(event.target.tagName === 'TEXTAREA'){
    resizeEvent(event);
    // arr.push(`<div style="left:${content.left}px; top:${content.top}px"><div></div><button>X</button><textarea style="width:${content.width}px; height:${content.height}px;">${event.tagName.value}</textarea></div>`)
  }
}

function resizeEvent(event){
  // arr = [];
  for(let i = 0; data.length; i++){
      arr.push(width.offsetWidth, height.data[i].offsetHeight, left.data[i].getBoundingClientRect().left, top.getBoundingClientRect().top, contents.event.target.value)
  }
  console.log(arr)
}

const savekey = localStorage.getItem('stickynote');
document.body.innerHTML = savekey;

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keydown', onKeydown);