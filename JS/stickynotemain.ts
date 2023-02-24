let cursorX: string, cursorY: string, isDragging: boolean, findX: number, findY: number, targetIndex: number, clipData: any, pastedData: string;
let count = 0;
const data: Array<DataInfo> = JSON.parse(localStorage.getItem('stickynote') || '') ?? [];

interface DataInfo {
  width: number;
  height: number;
  left: string;
  top: string;
  indexnum: number;
  textbox: string;
};

function render() {
  (document.querySelector('body') as HTMLElement).innerHTML = data.map((content: DataInfo) => `<div class="note-box" data-index=${content.indexnum} style="left:${content.left};  top:${content.top}"><div class="move-box"></div><button class="clost-btn">X</button><textarea oncontextmenu='event.cancelBubble=true;' placeholder="메모를입력하세요..." class="content-box" style="width:${content.width}px; height:${content.height}px;">${content.textbox}</textarea></div>`).join();
}

function onMousedown(event: MouseEvent) {
  const element = event.target as HTMLInputElement;
  const elementParent = element.parentNode as HTMLInputElement;

  if (event.button == 2 && element.tagName === 'BODY') {
    count = JSON.parse(localStorage.getItem('indexNumber') || '') ?? 0;
    data.push({ width: 200, height: 116, left: cursorX, top: cursorY, indexnum: count, textbox: '' });
    render();
    count++;
    localStorage.setItem("indexNumber", JSON.stringify(count));
    localStorage.setItem("stickynote", JSON.stringify(data));
  } else if (event.button == 0 && element.getAttribute('class') === 'clost-btn') {
    targetIndex = Number(elementParent.dataset);
    const findIndex = data.findIndex((i) => i.indexnum === targetIndex);
    data.splice(findIndex, 1);
    if (data.length === 0) {
      count = 0;
      localStorage.setItem("indexNumber", JSON.stringify(count));
    }
    render();
    localStorage.setItem("stickynote", JSON.stringify(data));
  } else if (event.button === 0 && element.getAttribute('class') === 'move-box') {
    findX = event.pageX - elementParent.getBoundingClientRect().x;
    findY = event.pageY - elementParent.getBoundingClientRect().y;
    isDragging = true;
    document.body.append(elementParent);
  }
}

function onMouseup(event: MouseEvent) {
  const element = event.target as HTMLInputElement;
  const elementParent = element.parentNode as HTMLInputElement;

  isDragging = false;
  targetIndex = Number(elementParent.dataset.index);
  const findIndex = data.findIndex((i) => i.indexnum === targetIndex);
  const targetValue = element.value;
  const contentFind = event.button === 0 && element.getAttribute('class') === 'content-box';
  const moveFind = event.button === 0 && element.getAttribute('class') === 'move-box';

  let changeData;
  if (contentFind || moveFind) {
    if (contentFind) {
      document.body.append(elementParent);
      element.focus();
      changeData = { width: element.offsetWidth, height: element.offsetHeight, left: `${elementParent.getBoundingClientRect().x}px`, top: `${elementParent.getBoundingClientRect().y}px`, indexnum: targetIndex, textbox: targetValue };
    } else if (moveFind) {
      const targetNotesubelement = (element.nextSibling as HTMLInputElement).nextSibling as HTMLInputElement;
      const targetValuesubelement = (element.nextSibling as HTMLInputElement).value;
      changeData = { width: targetNotesubelement.offsetWidth, height: targetNotesubelement.offsetHeight, left: `${elementParent.getBoundingClientRect().x}px`, top: `${elementParent.getBoundingClientRect().y}px`, indexnum: targetIndex, textbox: targetValuesubelement };
    }
    if (data.indexOf(data[data.length - 1]) === findIndex) {
      data.pop();
      data.push(changeData as DataInfo);
    } else {
      data.splice(findIndex, 1);
      data.push(changeData as DataInfo);
    }
    localStorage.setItem("stickynote", JSON.stringify(data));
  }
}

function onMousemove(event: MouseEvent) {
  const moveTarget = document.querySelector('body > div:last-of-type') as HTMLElement;
  cursorX = `${event.pageX}px`;
  cursorY = `${event.pageY}px`;
  if (isDragging) {
    moveTarget.style.top = `${event.pageY - findY}px`;
    moveTarget.style.left = `${event.pageX - findX}px`;
  }
}

function onKeyup(event: KeyboardEvent) {
  const element = event.target as HTMLInputElement;
  if (element.getAttribute('class') === 'content-box') {
    const targetValue = element.value;
    changData(element, targetValue);
  }
}

function onPaste(event: ClipboardEvent) {
  const element = event.target as HTMLInputElement;
  if (element.getAttribute('class') === 'content-box') {
    clipData = event.clipboardData || window.Clipboard;
    pastedData = clipData.getData('Text');
    changData(element, pastedData);
  }
}

function onCut(event: ClipboardEvent) {
  const element = event.target as HTMLInputElement;
  if (element.getAttribute('class') === 'content-box') {
    const targetValue = '';
    changData(element, targetValue);
  }
}

function changData(event: HTMLDivElement, value: string) {
  const elementParent = event.parentNode as HTMLInputElement;
  if (event !== null) targetIndex = Number(elementParent.dataset.index);
  const findIndex = data.findIndex((i) => i.indexnum === targetIndex);
  const changeData = { width: event.offsetWidth, height: event.offsetHeight, left: `${elementParent.getBoundingClientRect().x}px`, top: `${elementParent.getBoundingClientRect().y}px`, indexnum: targetIndex, textbox: value };
  data.splice(findIndex, 1, changeData);
  localStorage.setItem("stickynote", JSON.stringify(data));
}

render();

document.addEventListener('cut', onCut);
document.addEventListener('paste', onPaste);
document.addEventListener('mousedown', onMousedown);
document.addEventListener('mouseup', onMouseup);
document.addEventListener('mousemove', onMousemove);
document.addEventListener('keyup', onKeyup);