let left = true;
let sideBar = $(".innerNav").width();
getData("upcoming");

$("#menuBtn").click(() => {
  if (left) {
    $("#sideNav").animate({ left: 0 }, 500);
    left = false;
    document.getElementById("menuBtn").classList.replace("fa-bars", "fa-xmark");
    $("#playing").animate({ opacity: "1", paddingTop: "25px" }, 1100);
    $("#popular").animate({ opacity: "1", paddingTop: "25px" }, 1100);
    $("#top").animate({ opacity: "1", paddingTop: "25px" }, 1100);
    $("#latest").animate({ opacity: "1", paddingTop: "25px" }, 1100);
    $("#upcoming").animate({ opacity: "1", paddingTop: "25px" }, 1100);
    $("#contact").animate({ opacity: "1", paddingTop: "25px" }, 1100);
  } else {
    $("#sideNav").animate({ left: -`${sideBar}` }, 500);
    left = true;
    document.getElementById("menuBtn").classList.replace("fa-xmark", "fa-bars");
    $("#playing").animate({ opacity: "0", paddingTop: "100px" }, 300);
    $("#popular").animate({ opacity: "0", paddingTop: "100px" }, 1100);
    $("#top").animate({ opacity: "0", paddingTop: "100px" }, 1100);
    $("#latest").animate({ opacity: "0", paddingTop: "100px" }, 1100);
    $("#upcoming").animate({ opacity: "0", paddingTop: "100px" }, 1100);
    $("#contact").animate({ opacity: "0", paddingTop: "100px" }, 1100);
  }
});
document
  .querySelectorAll("#sideNav .innerNav .naveItem ")
  .forEach(function (link) {
    link.addEventListener("click", function () {
      let category = link.getAttribute("data-category");
      console.log(category);
      getData(category);
    });
  });
export async function getData(category) {
  let api = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=9c57c804a2d1e41b103ca79bcbdf02ff`
  );
  let response = await api.json();

  // console.log(response.results);
  displayData(response.results);
}

function displayData(response) {
  let data = "";
  for (let i = 0; i < response.length; i++) {
    data += `
  <div class="col-md-4">
  <div class="image rounded-2">
    <img
      src="https://image.tmdb.org/t/p/w500/${response[i].poster_path}"
      alt=""
      class="w-100"
    />
    <div
      class="layer  text-black overflow-hidden text-center d-flex flex-column justify-content-center align-items-center w-100"
    >
      <p class="title fs-1">${response[i].original_title}</p>
      <p class="overview fs-5 p-2">${response[i].overview}</p>
      <p class="rate fs-5">${response[i].vote_average}</p>
      <p class="releaseDate fs-5">2023-03-22</p>
    </div>
  </div>
</div>




  `;
  }
  document.getElementById("row").innerHTML = data;
}

// form
let inputs = document.querySelectorAll(".formInput");
console.log(inputs);
let formData = document.querySelector("form");

let isValid = true;

formData.addEventListener("input", function () {
  if (
    validateName(inputs[0]) &&
    validateEmail(inputs[1]) &&
    validatePhone() &&
    validateAge() &&
    validatePassword() &&
    validateReEnterPassword()
  ) {
    document.getElementById("subBtn").classList.remove("disabled");
  }
});

function validateName(el) {
  let regex = /^[a-zA-Z0-9]{1,}$/;
  if (regex.test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    return false;
  }
}

function validateEmail(el) {
  let regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    return false;
  }
}

function validatePhone() {
  let regex = /^01[0125][0-9]{8}$/;
  if (regex.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function validateAge() {
  let regex = /^[1-9][0-9]?$|^100$/g;
  if (regex.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function validatePassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  if (regex.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}

function validateReEnterPassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  if (inputs[4].value == inputs[5].value) {
    inputs[5].classList.add("is-valid");
    inputs[5].classList.remove("is-invalid");
    return true;
  } else {
    inputs[5].classList.add("is-invalid");
    inputs[5].classList.remove("is-valid");
    return false;
  }
}
