$(document).ready(function() {
    // Object to store the data used in this app
    var appData = {
      weatherIcon: "cloud",
      celcius: 0,
      fahrenheit: 0,
      city: "",
      weather: "",
      weatherId: 0,
      wind: "0 m/s",
      pressure: "0 Pa",
      humidity: "0%",
      latitude: 0.0,
      longitude: 0.0
    };
    
    // Colors for background
    var color = {
      default: "#009688", // teal 
      drizzle: "#cddc39", // lime
      clouds: "#607d8b", // blue-grey,
      rain: "#039be5", // light-blue darken
      snow: "#00acc1", // cyan darken-1
      atmosphere: "#00e676", // green accent-3
      clearSky: "#ffca28", // amber
      thunderstorm: "#795548", // brown
      extreme: "#e53935", // red darken-1
      breeze: "#8bc34a", // light-green
      gale: "#f4511e" // deep-orange darken-1
    };
      
    // Setup function. It will setup the app data
    function setup() {
      
      // Check for availability of geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          appData.latitude = position.coords.latitude;
          appData.longitude = position.coords.longitude;
          
          getWeatherData(appData);
        });
      }
      
      //If geolocation is not available
      else {
        windows.alert("Geolocation is not supported in this browser!");
      }
          
    } // setup()
    
    // If geolocation is available then fetch data
    function getWeatherData(appData, city) {
      var url;
      
      if(Boolean(city)){
        url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a3a297e1e9c933d338709d03fa993153";
      }
      else {
        url = "https://api.openweathermap.org/data/2.5/weather?lat="+appData.latitude+"&lon="+appData.longitude+"&appid=a3a297e1e9c933d338709d03fa993153";
      }
      
      // Fetch JSON data and initialize appData fields
      $.getJSON(url, function(json) {
        appData.celcius = Math.round(json.main.temp - 273.15);
        appData.fahrenheit = Math.round(appData.celcius*(9/5)+32);
        appData.city = json.name;
        appData.weather = json.weather[0].main;
        appData.weatherId = json.weather[0].id;
        appData.wind = json.wind.speed+" m/s";
        appData.pressure = (json.main.pressure*100)+" Pa";
        appData.humidity = json.main.humidity+"%";
  
        updateUI(appData);
        
      });
  
    } // getWeatherData()
    
    function updateUI(appData) {
      // Setting up data to elements' values
      $(".card-panel").css("background-color", function(){
        var bgColor = color.default;
        if(appData.weatherId >= 200 && appData.weatherId <= 232) {
          appData.weatherIcon = "flash_on";
          bgColor = color.thunderstorm;
        }
        else if(appData.weatherId >= 300 && appData.weatherId <= 321) {
          appData.weatherIcon = "bubble_chart";
          bgColor = color.drizzle;
        }
        else if(appData.weatherId >= 500 && appData.weatherId <= 531) {
          appData.weatherIcon = "beach_access";
          bgColor = color.rain;
        }
        else if(appData.weatherId >= 600 && appData.weatherId <= 622) {
          appData.weatherIcon = "ac_unit";
          bgColor = color.snow;
        }      
        else if(appData.weatherId >= 701 && appData.weatherId <= 781) {
          appData.weatherIcon = "looks";
          bgColor = color.atmosphere;
        }
        else if(appData.weatherId === 800) {
          appData.weatherIcon = "wb_sunny";
          bgColor = color.clearSky;
        }
        else if(appData.weatherId >= 801 && appData.weatherId <= 804) {
          appData.weatherIcon = "cloud";
          bgColor = color.clouds;
        }
        else if(appData.weatherId >= 900 && appData.weatherId <= 906) {
          appData.weatherIcon = "terrain";
          bgColor = color.extreme;
        }
        else if(appData.weatherId >= 951 && appData.weatherId <= 956) {
          appData.weatherIcon = "clear_all";
          bgColor = color.breeze;
        }
        else if(appData.weatherId >= 957 && appData.weatherId <= 962) {
          appData.weatherIcon = "clear_all";
          bgColor = color.gale;
        }
        
        return bgColor;
      });
      $("#main-weather-icon").text(appData.weatherIcon);
      $("#main-temp-value").text(appData.celcius+"°");
      $("#main-city-weather").text(appData.city+" | "+appData.weather);
      $("#others-wind").text(appData.wind);
      $("#others-pressure").text(appData.pressure);
      $("#others-humidity").text(appData.humidity);
      
    } // updateUI()
    
    $("#main-temp-unit").click(function() {
      var unit = $("#main-temp-unit").text();
      
      if(unit === "C") {
        $("#main-temp-value").text(appData.fahrenheit+"°");
        $("#main-temp-unit").text("F");
      }
      else {
        $("#main-temp-value").text(appData.celcius+"°");
        $("#main-temp-unit").text("C");
      }
    });
    
    $("#fire-search").on("click", function() {
      var city = $("#search-city").val();
      getWeatherData(appData, city);
    });
      
    // Call setup() at least once
    setup();
  });