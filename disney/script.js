const container = document.querySelector(".container");
const buttons = document.querySelector(".buttons");

// Initial Page number

var curPage = 1;

// Adding the pagination setup
const init = (curPage) => {
  let html = `
  ${
    curPage === 1
      ? ""
      : `<button id="prev" class="ui labeled icon button">
        <i id="prev" class="left chevron icon"></i>
        Page ${curPage - 1}
      </button>`
  }
  <button id="next" class="ui right labeled icon button">
    Page ${curPage + 1}
    <i id="next" class="right chevron icon"></i>
  </button>`;

  buttons.innerHTML = html;
};

init(curPage);

// For Handling the page click event
buttons.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.id === "next") {
    curPage++;
  }
  if (e.target.id === "prev" && curPage > 1) {
    curPage--;
  }

  // After every page click re-rendering the Current page number and Characters Setup
  init(curPage);
  disneyChar(curPage);
});

// Fetching the data from API
const disneyChar = async (curPage) => {
  const res = await fetch(
    `https://api.disneyapi.dev/characters?page=${curPage}`
  );
  const data = await res.json();

  // If page reaches last content guard class is added
  if (!data.nextPage) return;

  // rendering the characters using the card function for each data from API
  data.data.forEach((character) => {
    charDiv(character);
  });
};

// Rendering the page whenever the user first opens up the page
disneyChar(curPage);

// Helper function for rendering the card
const charDiv = (data) => {
  let filmName = data.films[0] ? data.films[0] : "Imaginary Character";
  let html = `<div
  class="twelve wide mobile six wide tablet four wide computer column ui card"
  >
  <div class="image">
    <img
      src="${data.imageUrl}"
    />
  </div>
  <div class="content">
    <h4 class="header">Hello! I'm <b>${data.name}</b></h4>
    <p class="description"><i>"From : ${
      data.tvShows[0] ? data.tvShows[0] : filmName
    }"</i></p>
  </div>
  <div class="extra content">
    <span class="right floated star">
      <i class="like icon"></i>
      Like
    </span>
  </div>
  </div>`;

  container.insertAdjacentHTML("afterbegin", html);

  // Additional feature for Like buttons
  document.querySelector(".like").addEventListener("click", (e) => {
    e.target.style.color = "#ce0707";
  });
};