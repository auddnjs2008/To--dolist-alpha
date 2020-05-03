const form = document.querySelector(".a-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentuser = localStorage.getItem(USER_LS);
  if (currentuser === null) {
    askForName();
  } else {
    paintGreeting(currentuser);
  }
}

function init() {
  loadName();
}

init();
