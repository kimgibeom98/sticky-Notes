let cursorx;
let cursory;
let isDragging;
let findX;
let findY;
let count = 0;
const data = JSON.parse(localStorage.getItem('stickynote')) ?? [];

function render(){

  document.querySelector('body').innerHTML = data.map((content) => `<div class="note-box" data-index=${content.indexnum} style="left:${content.left};  top:${content.top}"><div class="move-box"></div><button class="clost-btn">X</button><textarea placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;">${content.textbox}</textarea></div>`);
  console.log(data)

}

function onMousedown(event) {
  if (event.button == 2) {

    count =  JSON.parse(localStorage.getItem('indexNumber')) ?? 0;
    data.push({width : 200, height : 116, left : cursorx, top : cursory, indexnum : count, textbox : ''})
    render();
    count ++;
    localStorage.setItem("indexNumber", JSON.stringify(count));

  } else if (event.target.getAttribute('class') === 'clost-btn') {

    const eventindex = Number(event.target.parentNode.dataset.index);
    for(let i = 0; i < data.length; i++){  
      if (data[i].indexnum === eventindex) { 
        data.splice(i, 1); 
        i--; 
      }
    }
    localStorage.setItem("stickynote", JSON.stringify(data));
    render();
    if(data.length === 0){
      count == 0;
      localStorage.setItem("indexNumber", JSON.stringify(count));
    }

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
  if (event.button === 0 && event.target.getAttribute('class') === 'content-box') {

    document.body.append(event.target.parentNode);
    event.target.focus();
    const targetIndex = Number(event.target.parentNode.dataset.index)
    const targetValue = event.target.value; 
    const chagedata = {width : event.target.offsetWidth, height : event.target.offsetHeight, left : event.target.parentNode.getBoundingClientRect().x + 'px', top : event.target.parentNode.getBoundingClientRect().y + 'px', indexnum : targetIndex,  textbox : targetValue}
    data.splice(targetIndex, 1, chagedata)

  }else if(event.button === 0 && event.target.getAttribute('class') === 'move-box'){

    const targetIndex = Number(event.target.parentNode.dataset.index)
    const targetNote = event.target.nextSibling.nextSibling;
    const targetValue = event.target.nextSibling.nextSibling.value; 
    const chagedata = {width : targetNote.offsetWidth, height : targetNote.offsetHeight, left : event.target.parentNode.getBoundingClientRect().x + 'px', top : event.target.parentNode.getBoundingClientRect().y + 'px', indexnum : targetIndex,  textbox : targetValue}
    data.splice(targetIndex, 1, chagedata)
    console.log(chagedata)

  }
  localStorage.setItem("stickynote", JSON.stringify(data));
}

function onMousemove(event){

  const movetarget = document.querySelector('body > div:last-of-type');
  cursorx = `${event.pageX}px`;
  cursory = `${event.pageY}px`;
  if (isDragging) {
    movetarget.style.top = `${event.pageY - findY - 8}px`;
    movetarget.style.left = `${event.pageX - findX - 8}px`;
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
  
}

function onKeyup(event){

  let tareetValue;
  if(event.target.getAttribute('class') === 'content-box'){
    const targetIndex = Number(event.target.parentNode.dataset.index)
    tareetValue = event.target.value 
    const chagedata = {width : event.target.offsetWidth, height : event.target.offsetHeight, left : event.target.parentNode.getBoundingClientRect().left + 'px', top : event.target.parentNode.getBoundingClientRect().top + 'px', indexnum : targetIndex,  textbox : tareetValue}
    data.splice(targetIndex, 1, chagedata)
  }
  localStorage.setItem("stickynote", JSON.stringify(data));
  console.log(data)

}

render();

document.addEventListener('contextmenu', (event) => {event.preventDefault();});
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);