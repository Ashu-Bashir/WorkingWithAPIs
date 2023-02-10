const form = document.querySelector("#form");
const cityNameInput = document.querySelector("#cityName");
const output = document.querySelector("#output");
const cancelBtn = document.querySelector("#cancelBtn");
const searchBtn = document.querySelector("#search")

let cachedCityData = new Map();
let cityData;
let controller;

cancelBtn.disabled = true;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cachedCityData.has(cityNameInput.value)) {
    output.innerHTML = cachedCityData.get(cityNameInput.value);
    return;
  }
  controller = new AbortController();


  cityNameInput.disabled = true;
  cancelBtn.disabled = false;
  output.innerHTML = "";

  let myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "iFFhBwWW3gM1Ji3p6VRVdw==0vaC8rrDpuIIZlNc");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    signal: controller.signal

  };

  const cityName = cityNameInput.value;
  let isDataFetched = false;
  const API_URL = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

  if (!isDataFetched) {
    isDataFetched = true;
    searchBtn.disabled = true;

    try{
      const response = await fetch(API_URL, requestOptions)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
          cityData = "Ooops!! City not found" + " " + "\u{1F62C}";
        } else {
          cityData = "";
          data.forEach((item) => {
            cityData += `
            <ul>
              <h1>The Details For The City - ${Date.now()}: <i>${item.name}</i></h1>
              <li>City: ${item.name}</li>
              <li>Country: ${item.country}</li>
              <li>Is The City a Capital City?: ${item.is_capital}</li>
              <li>Latitude: ${item.latitude}</li>
              <li>Longitude: ${item.longitude}</li>
              <li>Population: ${item.population}</li>
            </ul> 
          `;
          });
        }
        output.innerHTML = cityData;
        cachedCityData.set(cityName , cityData)
        searchBtn.disabled = false;
        isDataFetched = false;


      }
      catch(error)  {
        if (error.name === "AbortError") {
          console.log("API call was cancelled");
          return;
        }

        console.error("There was a problem with the fetch operation:", error);
        cityData = "Ooops!! Something went wrong" + " " + "\u{1F62C}";
        output.innerHTML = cityData;
      }
      finally {
        cityNameInput.disabled = false;
        cancelBtn.disabled = true;
      };

  }
});

// ADDING CANCEL BUTTON TO CANCEL API REQUEST
cancelBtn.addEventListener("click", () => {
  controller.abort();
  cityNameInput.disabled = false;
  cityNameInput.value = "";
  output.innerHTML = "You cancelled the request.";
  cityData = '';
  // cancelBtn.disabled = false;
  searchBtn.disabled= false


});


































