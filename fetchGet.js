const cityNameInput = document.querySelector("#cityName");
const output = document.querySelector("#output");
const cancelBtn = document.querySelector("#cancelBtn");
const searchBtn = document.querySelector("#search");
let cachedCityData = new Map();
let controller;

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (cityNameInput.value === "") {
    output.innerHTML = "Please enter a city name" ;
    return   
  }

  if (cachedCityData.has(cityNameInput.value)) {
    output.innerHTML = cachedCityData.get(cityNameInput.value);
    return;
  }

  controller = new AbortController();
  cityNameInput.disabled = true;
  cancelBtn.hidden = false;
  output.innerHTML = "";
  let cityData = "";

  const cityName = cityNameInput.value;  
  try {
      searchBtn.disabled = true;
      const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
        method: "GET",
        headers: {
          "X-Api-Key":"iFFhBwWW3gM1Ji3p6VRVdw==0vaC8rrDpuIIZlNc"
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length === 0) {
        cityData = "Ooops!! City not found" + " " + "\u{1F62C}";
      } else {
        data.forEach((item) => {
          cityData += `
            <ul>
              <h1>The Details For The City - ${Date.now()}: <i>${
            item.name
          }</i></h1>
              <li>City: ${item.name}</li>
              <li>Country: ${item.country}</li>
              <li>Is The City a Capital City?: ${item.is_capital}</li>
              <li>Latitude: ${item.latitude}</li>
              <li>Longitude: ${item.longitude}</li>
              <li>Population: ${item.population}</li>
            </ul> 
          `;
        });
        cachedCityData.set(cityName, cityData);
      }
      output.innerHTML = cityData;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("API call was cancelled");
        return;
      }

      console.error("There was a problem with the fetch operation:", error);
      cityData = "Ooops!! Something went wrong" + " " + "\u{1F62C}";
      output.innerHTML = cityData;
      cachedCityData.set(cityName, cityData);

    } finally {
      cityNameInput.disabled = false;
      cancelBtn.hidden = true;
      searchBtn.disabled = false;

    }
});

const hideCancelMessage = () => {
  setTimeout(() => {
    output.innerHTML = "";
  }, 3000); 
}


// ADDING CANCEL BUTTON TO CANCEL API REQUEST
cancelBtn.addEventListener("click", () => {
  controller.abort();
  cityNameInput.disabled = false;
  cityNameInput.value = "";
  output.innerHTML = "You cancelled the request.";
  searchBtn.disabled = false;
  hideCancelMessage();
});

