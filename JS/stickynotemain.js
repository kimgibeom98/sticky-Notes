let cursorX, cursorY, isDragging, findX, findY, targetIndex, clipboardData, pastedData;
let count = 0;
const data = JSON.parse(localStorage.getItem('stickynote')) ?? [];

function render(){
  document.querySelector('body').innerHTML =  data.map((content) => `<div class="note-box" data-index=${content.indexnum} style="left:${content.left};  top:${content.top}"><div class="move-box"></div><button class="clost-btn">X</button><textarea oncontextmenu='event.cancelBubble=true;' placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;">${content.textbox}</textarea></div>`);  
}

function onMousedown(event) {
  if (event.button == 2 && event.target.tagName === 'BODY') {
    count =  JSON.parse(localStorage.getItem('indexNumber')) ?? 0;
    data.push({width : 200, height : 116, left : cursorX, top : cursorY, indexnum : count, textbox : ''})
    render();
    count ++;
    localStorage.setItem("indexNumber", JSON.stringify(count));
    localStorage.setItem("stickynote", JSON.stringify(data));
  } else if (event.button == 0 && event.target.getAttribute('class') === 'clost-btn') {
    targetIndex = Number(event.target.parentNode.dataset.index);
    const findIndex = data.findIndex((i) => i.indexnum === targetIndex)
    data.splice(findIndex, 1);
    if(data.length === 0){
      count = 0;
      localStorage.setItem("indexNumber", JSON.stringify(count));
    }
    render();
    localStorage.setItem("stickynote", JSON.stringify(data));
  } else if (event.button === 0 && event.target.getAttribute('class') === 'move-box') {
    findX = event.pageX - event.target.parentNode.getBoundingClientRect().x;
    findY = event.pageY - event.target.parentNode.getBoundingClientRect().y;
    isDragging = true
    document.body.append(event.target.parentNode);
  }
}

function onMouseup(event){
  isDragging = false
  targetIndex = Number(event.target.parentNode.dataset.index)
  const findIndex = data.findIndex((i) => i.indexnum === targetIndex)
  const targetValue = event.target.value; 
  const contentFind = event.button === 0 && event.target.getAttribute('class') === 'content-box';
  const moveFind = event.button === 0 && event.target.getAttribute('class') === 'move-box';
  let changeData;
  if (contentFind || moveFind) {
    if (contentFind){
      document.body.append(event.target.parentNode);
      event.target.focus();
      changeData = {width : event.target.offsetWidth, height : event.target.offsetHeight, left : `${event.target.parentNode.getBoundingClientRect().x}px`, top : `${event.target.parentNode.getBoundingClientRect().y}px`, indexnum : targetIndex,  textbox : targetValue}
    } else if (moveFind){
      const targetNotesubelement = event.target.nextSibling.nextSibling;
      const targetValuesubelement = event.target.nextSibling.nextSibling.value; 
      changeData = {width : targetNotesubelement.offsetWidth, height : targetNotesubelement.offsetHeight, left : `${event.target.parentNode.getBoundingClientRect().x}px`, top : `${event.target.parentNode.getBoundingClientRect().y}px`, indexnum : targetIndex,  textbox : targetValuesubelement}
    }
    if (data.indexOf(data[data.length -1]) === findIndex){
      data.pop();
      data.push(changeData)
    } else {
      data.splice(findIndex, 1)
      data.push(changeData)

    }
    localStorage.setItem("stickynote", JSON.stringify(data));
  }
}

function onMousemove(event){
  const moveTarget = document.querySelector('body > div:last-of-type');
  cursorX = `${event.pageX}px`;
  cursorY = `${event.pageY}px`;
  if (isDragging) {
    moveTarget.style.top = `${event.pageY - findY}px`;
    moveTarget.style.left = `${event.pageX - findX}px`;
  }
}

function onKeyup(event){
  if (event.target.getAttribute('class') === 'content-box'){
    const targetValue = event.target.value 
    changData(event.target, targetValue);
  }
}

function onPaste(event){
  if (event.target.getAttribute('class') === 'content-box'){
    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    changData(event.target, pastedData);
  }
}

function onCut(event){
  if (event.target.getAttribute('class') === 'content-box'){
    const targetValue = ''
    changData(event.target, targetValue)
  }
}

function changData(event, value){
  targetIndex = Number(event.parentNode.dataset.index)
  const findIndex = data.findIndex((i) => i.indexnum === targetIndex)
  const changeData = {width : event.offsetWidth, height : event.offsetHeight, left : `${event.parentNode.getBoundingClientRect().x}px`, top : `${event.parentNode.getBoundingClientRect().y}px`, indexnum : targetIndex,  textbox : value}
  data.splice(findIndex, 1, changeData)
  localStorage.setItem("stickynote", JSON.stringify(data));
}

render();

document.addEventListener('cut', onCut);
document.addEventListener('copy', onKeyup);
document.addEventListener('paste', onPaste);
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);