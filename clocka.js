const clock = document.querySelector(".a-clock");
const time = clock.querySelector("h5");
const now = clock.querySelector("h4"); //날짜

function getClock() {
  const watch = new Date();
  const year = watch.getFullYear();
  const month = watch.getMonth() + 1;
  const day = watch.getDate();
  const hour = watch.getHours();
  const min = watch.getMinutes();
  const sec = watch.getSeconds();

  now.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  time.innerText = `${hour < 10 ? `0${hour}` : hour} : ${
    min < 10 ? `0${min}` : min
  } : ${sec < 10 ? `0${sec}` : sec}`;
}

function init() {
  getClock();
  setInterval(getClock, 1000);
}

init();
