const API_KEY = "764d14ef0375787bca29f1b75f37d10b";
const form = document.querySelector("#myForm");
const cityInput = document.querySelector("#cityInput");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
// const message = document.querySelector("#message");
const btn = document.querySelector("#getWeatherBtn");

const formHandler = async (event) => {
  try {
    event.preventDefault(); // prevents page refresh

    message.innerText = "loading..."; // showing loading
    temp.innerText = "";
    humidity.innerText = "";
    btn.disabled = true; // disable button so user doesn't click button more than once

    const city = cityInput.value;

    const response = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    form.reset(); // to clear input value only if form is submitted successfully

    temp.innerText = `Temprature${response.data.main.temp}°C`;
    humidity.innerText = `Humidity${response.data.main.humidity}`;

    console.log("🚀 ~ formHandler ~ response:", response.data);

    //
  } catch (error) {
    console.log("error", error);

    swal({
      title: "Error",
      icon: "error",
      text: error?.response?.data?.message || "Unknawn error please try again",
    });

    //
  } finally {
    console.log("finally will run in every situation");

    message.innerText = ""; // clearing old msgs

    btn.disabled = false;
  }
  console.log("last line of function");
};

form.addEventListener("submit", formHandler);
