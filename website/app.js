/* Global Variables */
const apiKey = "7c45c3f0c4257b1d5b6637155c16479c";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Very simplified check for zip codes (only allow numbers)
const checkZipCode = new RegExp("^\\d+$");

let myTemp = "";
let zipCode = "";
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const button = document.getElementById("generate");
button.addEventListener("click", buttonClickListener);

function buttonClickListener(event) {
  zipCode = document.getElementById("zip").value;
  let myUrl = baseUrl + zipCode + ",de&units=metric&appId=" + apiKey;

  console.log(zipCode);
  if (
    checkZipCode.test(zipCode) &&
    document.getElementById("feelings").value !== ""
  ) {
    getWeatherData(myUrl)
      .then(() => {
        persistWeatherData("/projectData", {
          date: newDate,
          temp: myTemp,
          feel: document.getElementById("feelings").value
        });
      })
      .then(() => {
        document.getElementById("feelings").value = "";
        document.getElementById("zip").value = "";
        updateUi("/projectData");
      });
  } else {
    console.log("user input empty or zip code invalid");
  }
}

const updateUi = async (url, data = {}) => {
  console.log(url);
  const entries = await fetch(url);
  try {
    const data = await entries.json();
    // console.log(data);
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temp + "°C";
    document.getElementById("content").innerHTML = data.feel;
  } catch (error) {
    console.log("💩 something went wrong during ui update... ", error);
  }
};

const getWeatherData = async (url, data = {}) => {
  console.log(url);
  const weatherResult = await fetch(url);

  try {
    const data = await weatherResult.json();
    myTemp = data.main.temp;
  } catch (error) {
    console.log(
      "💩 something went wrong while retrieving data from weather service... ",
      error
    );
  }
};

// Async POST
const persistWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
};
