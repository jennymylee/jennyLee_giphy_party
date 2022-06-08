const API_KEY = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H";
const LIMIT = 9;
const RATING = "g";

let currentPageNum = 0;

let currentTerm = "";

let formContentElement = document.querySelector(".form-content");
let termElement = document.querySelector("#term");
let resultsElement = document.querySelector(".results");
let searchElement = document.querySelector("#clicker");
let moreResultsButtonElement = document.querySelector(".more-results");

formContentElement.addEventListener("submit", handleFormSubmit);
moreResultsButtonElement.addEventListener("click", showMore);

async function getResults(term) {
  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term.toLowerCase()}`
  );
  const jsonResponse = await response.json();

  return jsonResponse;
}

function displayResults(res) {
  let offset = currentPageNum * LIMIT;
  console.log("cpn:", currentPageNum);
  console.log("offset:", offset);

  setOfGifs = res.data.slice(offset, offset + LIMIT);

  setOfGifs.forEach((gif, i) => {
    resultsElement.innerHTML += `<img class="gif" src="${setOfGifs[i].images.original.url}" alt='gif'>`;
  });
}

async function showMore(e) {
  e.preventDefault();
  console.log(currentTerm);
  const data = await getResults(currentTerm);
  displayResults(data);
  currentPageNum = currentPageNum + 1;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  // Remove gifs from page
  resultsElement.innerHTML = "";

  moreResultsButtonElement.classList.add("hidden");

  const searchTerm = e.target.name.value;
  currentTerm = searchTerm;

  const data = await getResults(searchTerm);

  displayResults(data);
  // Unhide show more button
  moreResultsButtonElement.classList.remove("hidden");
  currentPageNum = 1;

  // Clear input text box
  termElement.value = "";
}
