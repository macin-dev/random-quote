// App state
const tagsContainer = document.querySelector(".quote__tags");
let quotes = [];

// Fetch the data from an external API
function fetchData() {
  const url =
    "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      quotes = data;

      // Load on first render
      displayRandomQuote();

      // Register evenet listeners
      document
        .getElementById("randomBtn")
        .addEventListener("click", displayRandomQuote);
      document
        .getElementById("shareBtn")
        .addEventListener("click", () => console.log("share btn"));
    })
    .catch((error) => console.error("Error fetching quote:", error));
}

// It displays random quotes
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // DOM Manipulation
  document.querySelector(".quote__text").textContent = quote.quote;
  document.querySelector(".quote__author").textContent = quote.author;

  tagsContainer.innerHTML = "";
  quote.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "quote__tags-item";
    span.textContent = tag;

    tagsContainer.appendChild(span);
  });
}

fetchData();
