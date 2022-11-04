// Get elemnet from html class

const hours = document.getElementById("hours");
const minutes = document.getElementById("minuts");
const sec = document.getElementById("sec");

setInterval(() => {
  // get current date from your machine
  let time = new Date();
  let hr = time.getHours() * 30;
  let min = time.getMinutes() * 6;
  let second = time.getSeconds() * 6;

  // rotate needles of the clock
  hours.style.transform = `rotateZ(${hr + min / 12}deg)`;
  minutes.style.transform = `rotateZ(${min}deg)`;
  sec.style.transform = `rotateZ(${second}deg)`;
});
