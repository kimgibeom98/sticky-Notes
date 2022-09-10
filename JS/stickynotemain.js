let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let count = 0;
let targetIndex;
const data = JSON.parse(localStorage.getItem('stickynote')) ?? [];

function render(){
  document.querySelector('body').innerHTML =  data.map((content) => `<div class="note-box" data-index=${content.indexnum} style="left:${content.left};  top:${content.top}"><div class="move-box"></div><button class="clost-btn">X</button><textarea placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;">${content.textbox}</textarea></div>`);  
}

function onMousedown(event) {
  if (event.button == 2) {
    count =  JSON.parse(localStorage.getItem('indexNumber')) ?? 0;
    data.push({width : 200, height : 116, left : cursorx, top : cursory, indexnum : count, textbox : ''})
    render();
    count ++;
    localStorage.setItem("indexNumber", JSON.stringify(count));
  } else if (event.target.getAttribute('class') === 'clost-btn') {
    targetIndex = Number(event.target.parentNode.dataset.index);
    for(let i = 0; i < data.length; i++){  
      if (data[i].indexnum === targetIndex) { 
        data.splice(i, 1); 
        i--; 
      }
    }
    if(data.length === 0){
      count = 0;
      localStorage.setItem("indexNumber", JSON.stringify(count));
    }
    render();
  } else if (event.button === 0 && event.target.getAttribute('class') === 'move-box') {
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().x;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().y;
    isDragging = true
    document.body.append(event.target.parentNode);
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

function onMouseup(event){
  isDragging = false
  targetIndex = Number(event.target.parentNode.dataset.index)
  const findIndex = data.findIndex((i) => i.indexnum === targetIndex)
  const targetValue = event.target.value; 
  let chagedata;
  if (event.button === 0 && event.target.getAttribute('class') === 'content-box' || event.button === 0 && event.target.getAttribute('class') === 'move-box') {
    if(event.button === 0 && event.target.getAttribute('class') === 'content-box'){
      document.body.append(event.target.parentNode);
      event.target.focus();
      chagedata = {width : event.target.offsetWidth, height : event.target.offsetHeight, left : event.target.parentNode.getBoundingClientRect().x + 'px', top : event.target.parentNode.getBoundingClientRect().y + 'px', indexnum : targetIndex,  textbox : targetValue}
    }else if(event.button === 0 && event.target.getAttribute('class') === 'move-box'){
      const targetNotesubelement = event.target.nextSibling.nextSibling;
      const targetValuesubelement = event.target.nextSibling.nextSibling.value; 
      chagedata = {width : targetNotesubelement.offsetWidth, height : targetNotesubelement.offsetHeight, left : event.target.parentNode.getBoundingClientRect().x + 'px', top : event.target.parentNode.getBoundingClientRect().y + 'px', indexnum : targetIndex,  textbox : targetValuesubelement}
    }
    if(data.indexOf(data[data.length -1]) === findIndex){
      data.pop();
      data.push(chagedata)
    }else{
      data.splice(findIndex, 1)
      data.push(chagedata)
    }
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

function onMousemove(event){
  const movetarget = document.querySelector('body > div:last-of-type');
  cursorx = `${event.pageX}px`;
  cursory = `${event.pageY}px`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY}px`;
    movetarget.style.left = `${event.pageX - findX}px`;
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

function onKeyup(event){
  if(event.target.getAttribute('class') === 'content-box'){
    targetIndex = Number(event.target.parentNode.dataset.index)
    const findIndex = data.findIndex((i) => i.indexnum === targetIndex)
    const targetValue = event.target.value 
    const chagedata = {width : event.target.offsetWidth, height : event.target.offsetHeight, left : event.target.parentNode.getBoundingClientRect().left + 'px', top : event.target.parentNode.getBoundingClientRect().top + 'px', indexnum : targetIndex,  textbox : targetValue}
    data.splice(findIndex, 1, chagedata)
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

render();

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);