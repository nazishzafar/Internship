// get Element from html file by id
const button: HTMLElement | any = document.getElementById("button");
const audio: HTMLElement | any = document.getElementById("audio");
const jokeText: HTMLElement | any = document.getElementById("joke_text");

function tellme(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
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
    }
    catch (error) {
      console.error(error);
    }
  }
  // button click and audio handler
  function buttonevent(): void {
    button.addEventListener("click", getJokes);

  }

  buttonevent();
