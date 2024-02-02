let quote = document.getElementById("quote");
let author = document.getElementById("author");
const url = "https://api.quotable.io/random";

let lastUpdated = sessionStorage.getItem("lastUpdated");

if (!lastUpdated || new Date() - new Date(lastUpdated) > 86400000) {
  getQuote();
} else {
  quote.innerText = sessionStorage.getItem("lastQuote");
  author.innerText = sessionStorage.getItem("lastAuthor");
}

function getQuote() {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      quote.innerText = item.content;
      author.innerText = item.author;
      sessionStorage.setItem("lastUpdated", new Date().toString());
      sessionStorage.setItem("lastQuote", item.content);
      sessionStorage.setItem("lastAuthor", item.author);
    })
    .catch((error) => console.error(error));
}

setInterval(getQuote, 86400000);