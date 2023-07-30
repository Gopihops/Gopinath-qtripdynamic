import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let data = await fetch(config.backEndPoint + "/reservations")
    let reserved = await data.json()
    return reserved;
  }

  // Place holder for functionality to work in the Stubs
  catch (err){
  return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let banner = document.getElementById("no-reservation-banner")
  let parent = document.getElementById("reservation-table-parent")
  if (reservations.length === 0){
    banner.style.display = "block";
    parent.style.display = "none";
  } else{
    banner.style.display = "none";
    parent.style.display = "block";
    let table = document.getElementById("reservation-table")
    reservations.forEach((reserve)=> {
      let adv_link = `../detail/?adventure=$(reserve.adventure)`
      table.innerHTML+= `
      <tr>
      <td><b>${reserve.id}</b></td>
      <td>${reserve.name}</td>
      <td>${reserve.adventureName}</td>
      <td>${reserve.person}</td>
      <td>${new Date(reserve.date).toLocaleDateString("en-IN")}</td>
      <td>${reserve.price}</td>
      <td>${new Date(reserve.time).toLocaleString("en-IN", {day: "numeric", month:"IN", year: "numeric"})}, ${new date(reserve.time).toLocaleTimeString("en-IN")}}</td>
      <td><button class="reservation-visit-button" id=${reserve.id}><a href=${adv_link}</button></a></td>
      </tr>`
    })
  }


}

export { fetchReservations, addReservationToTable };
