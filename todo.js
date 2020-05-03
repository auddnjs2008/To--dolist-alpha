const toDoForm = document.querySelector(".a-todo");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todolist");
const toDoFin = document.querySelector(".finish");

const TODOS_LS = "toDos";
const FINISH_LS = "finish";

let toDos = [];
let finish = [];

function saveList(listType, listarray) {
  localStorage.setItem(listType, JSON.stringify(listarray));
}

function swtList(listType, text) {
  const swtbtn = event.target;
  const li = swtbtn.parentNode;

  if (listType === TODOS_LS) {
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveList(TODOS_LS, toDos);
    paint(FINISH_LS, text);
  } else if (listType === FINISH_LS) {
    toDoFin.removeChild(li);

    const cleanFinish = finish.filter(function (newfinish) {
      return newfinish.id !== parseInt(li.id);
    });
    finish = cleanFinish;
    saveList(FINISH_LS, finish);
    paint(TODOS_LS, text);
  }
}

function deleteList(listType) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  if (listType === TODOS_LS) {
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveList(TODOS_LS, toDos);
  } else if (listType === FINISH_LS) {
    toDoFin.removeChild(li);
    const cleanFinish = finish.filter(function (newfinish) {
      return newfinish.id !== parseInt(li.id);
    });
    finish = cleanFinish;
    saveList(FINISH_LS, finish);
  }
}
function paint(listType, text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const swtBtn = document.createElement("button");

  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(swtBtn);

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", function () {
    deleteList(listType);
  });

  swtBtn.innerText = "✔";
  swtBtn.addEventListener("click", function () {
    swtList(listType, text);
  });

  if (listType === TODOS_LS) {
    toDoList.appendChild(li);
    const toDosId = toDos.length + 1;
    li.id = toDosId;

    const toDosObj = {
      text: text,
      id: toDosId,
    };

    toDos.push(toDosObj);
    saveList(TODOS_LS, toDos);
  } else if (listType == FINISH_LS) {
    toDoFin.appendChild(li);
    const finishId = finish.length + 1;
    li.id = finishId;

    const finishObj = {
      text: text,
      id: finishId,
    };
    finish.push(finishObj);
    saveList(FINISH_LS, finish);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paint(TODOS_LS, currentValue);
  toDoInput.value = "";
}

function loadList(listType) {
  const loadedList = localStorage.getItem(listType);
  if (loadedList != null) {
    const parseListType = JSON.parse(loadedList);
    parseListType.forEach(function (list) {
      paint(listType, list.text);
    });
  }
}

function init() {
  loadList(TODOS_LS);
  loadList(FINISH_LS);
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
