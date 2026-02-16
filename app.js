// App state
const tagsContainer = document.querySelector(".quote__tags");
let quotes = [];
let currentQuote = "";

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
      document.getElementById("shareBtn").addEventListener("click", () => {
        copyToClipboard(currentQuote);
      });
    })
    .catch((error) => console.error("Error fetching quote:", error));
}

// It displays random quotes
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  currentQuote = quote.quote;

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

// Copy-paste API
async function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const copyBtn = document.querySelector(".btn-copy");
      copyBtn.classList.add("copied");

      setTimeout(() => {
        copyBtn.classList.remove("copied");
      }, 2000);
    })
    .catch((error) => console.log("Error copying to the clipboard:", error));
}

fetchData();
