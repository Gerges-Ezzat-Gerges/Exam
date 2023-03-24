import { getData } from "./home.js";

let wordSearch = document.getElementById("wordSearch");
// console.log(wordSearch.value);

wordSearch.addEventListener("keyup", () => {
  displaySearch(wordSearch.value);
  if (wordSearch.value == "") {
    getData("upcoming");
  }
});

async function displaySearch(word) {
  let api = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9c57c804a2d1e41b103ca79bcbdf02ff&query=${word}&page=1`
  );
  let response = await api.json();
  console.log(response.results);
  let data = ``;
  for (let i = 0; i < response.results.length; i++) {
    console.log(response.results[i].title);
    data += `
    <div class="col-md-4">
    <div class="image rounded-2">
      <img
        src="https://image.tmdb.org/t/p/w500//${response.results[i].poster_path}"
        alt=""
        class="w-100"
      />
      <div
        class="layer  text-black overflow-hidden text-center d-flex flex-column justify-content-center align-items-center w-100"
      >
        <p class="title fs-1">${response.results[i].title}</p>
        <p class="overview fs-5 p-2">${response.results[i].overview}</p>
        <p class="rate fs-5">${response.results[i].vote_average}</p>
        <p class="releaseDate fs-5">2023-03-22</p>
      </div>
    </div>
  </div>
    `;

    document.getElementById("row").innerHTML = data;
  }
}
///////////
