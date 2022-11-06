// get Element from html file by id
const button = document.getElementById("button");
const audio = document.getElementById("audio");
const jokeText = document.getElementById("joke_text");
// disable or enable button when audio is ended or start
function toggleButton() {
  button.disabled = !button.disabled;
}
// function that convert text to audion through VoiceRss SDK
function tellme(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "83e66ec2d2b14869aa6c3c70391f8f82",
    src: jokeString,
    hl: "en-us",
    v: "Mary",
    r: 2,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// fetch jokes through api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellme(joke);
    jokeText.innerHTML = joke;

    console.log(joke);

    toggleButton();
  }
   catch (error) {
    console.error(error);
  }
}
// button click and audio handler
function buttonevent() {
  button.addEventListener("click", getJokes);
  audio.addEventListener("ended", toggleButton);
}

buttonevent();
