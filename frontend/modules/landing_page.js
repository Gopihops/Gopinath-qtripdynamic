import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    // TODO: MODULE_CITIES
    // 1. Fetch cities using the Backend API and return the data
    const cities = await fetch(config.backendEndpoint + "/cities");
    const data = await cities.json();
    console.log(cities);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const data = document.querySelector("#data");
  const newCard = document.createElement("div");
  // newCard.id = id;
  newCard.className = 'col-6 col-lg-3 mb-4 tile';
  newCard.innerHTML = `
    <a href = "/frontend/pages/adventures/?city=${id}" id="${id}">
      <div class = "tile">
        <img src = "${image}"/>
        <div class = "tile-text text-centre">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  `;
  data.append(newCard)
  console.log(document.getElementById(id).href)
}


export { init, fetchCities, addCityToDOM };
