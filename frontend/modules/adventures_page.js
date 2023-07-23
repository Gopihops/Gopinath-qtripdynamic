import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split('=')[1]

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    // TODO: MODULE_CITIES
    // 1. Fetch cities using the Backend API and return the data
    const adventures = await fetch(config.backendEndpoint+"/adventures/?city="+city);
    const data = await adventures.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  console.log(adventures)
const thisDiv =document.querySelector("#data");
const array =[];
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
adventures.forEach(item=> {
  const {id, name, costPerHead, image,   duration, currency, category}=item;
  const newCard=document.createElement("div");
  newCard.className="col-6 col-md-4 col-lg-3 mb-3 px-2 activity-card-div";
  newCard.innerHTML=`
  <a href="/detail/?adventure=${id}" id="${id}">
   <div class ="card activity-card bg-light">
     <img class ="card-img-top" src=${image} alt=${id}>
     <div class ="card-header w-100 d-flex align-items-center justify-content-between">
        <span>${name}</span>
         <span>${costPerHead}</span>
  </div>
  <div class ="card-body">
     <p class ="w-100 d-flex align-items-center justify-content-between">
       <span class ="duration"> Duration </span>
        <span class ="duration">${duration} Hours</span>
     </p>
  </div>
 </div>
 </a>
<div class ="category-banner">${category}</div>`;
  thisDiv.append(newCard);

})
// thisDiv.append(addNewAdventure());

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM

// }

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList= list.filter((e) => ((e.duration>=low)&&(e.duration<=high)));
  console.log(filteredList);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList= [];
  list.filter((e) => {
    if(categoryList.includes(e.category))
    filteredList.push(e);
  })
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList =[];
  let array = filters["duration"].split("-");
  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredList = filterByCategory(list, filters.category)
    filteredList = filterByDuration(filteredList,parseInt(array[0]),parseInt(array[1]))
  }
  else if(filters["category"].length>0){
    filteredList= filterByCategory(list, filters.category);
  }
  else if(filters["duration"].length>0){
    filteredList= filterByDuration(list, parseInt(array[0]),parseInt(array[1]))
  }
  else{
    return list;
  }
 
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let parsing= JSON.parse(window.localStorage.getItem("filters"));
  return parsing;
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters["category"];
  let order = [];
  for(let i=0;i<categoryList.length;i++){
    order.push(categoryList[i]);
  }
  for(let i=0;i<order.length;i++){
    let div= document.createElement("div");
    div.setAttribute("class", "category-filter");
    div.innerText = order[i]
    document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
