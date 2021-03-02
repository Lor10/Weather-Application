window.addEventListener('load', ()=> {
    let long;
    let lat;

    let locationTimezone = document.querySelector('.location-timezone');

    let weatherIcon = document.querySelector('.weather-icon');
    let weatherDescription = document.querySelector('.weather-description');
    let windType = document.querySelector('.wind');
    let windDirection = document.querySelector('.wind-speed');
    let humidity = document.querySelector('.humidity');

    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');
    let imperial = document.querySelector('#imperial');
    let metric = document.querySelector('#metric');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=187614bb428897fb0613bf83f772672b`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    //set DOM Elements from API
                    console.log(data);
                    let celsius = (Math.round((data.main.temp-273.15)*100)/100).toFixed(2);
                    temperatureDegree.textContent = celsius;
                    locationTimezone.textContent = data.name;

                    //weather descriptions
                    weatherDescription.textContent = capitalize(data.weather[0].description);
                    let windSpeedMS = data.wind.speed;
                    windType.textContent = `Wind: ${windSpeed(data.wind.speed)}`;
                    windDirection.textContent = `${windBearing(data.wind.deg)} ${windSpeedMS} m/s`;
                    humidity.textContent = `Humidity: ${data.main.humidity}%`

                    //set Icon
                    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    weatherIcon.innerHTML = `<img class="icon" width="200px" height="200px"src="${icon}"/>`;

                    //change between celsius and fahrenheit
                        imperial.addEventListener('click', () => {
                            temperatureSpan.textContent = "F";
                            let fahrenheit = (Math.round((celsius*(9/5) + 32)*100)/100).toFixed(2);
                            temperatureDegree.textContent = fahrenheit;
                            let windSpeedFT = (Math.round((data.wind.speed*3.281)*100)/100).toFixed(2);
                            windDirection.textContent = `${windBearing(data.wind.deg)} ${windSpeedFT} ft/s`;
                        });
                        metric.addEventListener('click', () => {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius;
                            windDirection.textContent = `${windBearing(data.wind.deg)} ${windSpeedMS} m/s`;
                        });
                });
        });

    }else{
        h1.textContent = "please enable location"
    }

});

const capitalize = ((sentence) => {
    return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
});
const windSpeed = ((speed) => {
    switch(true){
        case speed < 0.5:
            return "Calm";
        case speed < 1.5:
            return "Light Air";
        case speed < 0.5:
            return "Light Breeze";
        case speed < 5.5:
            return "Gentle Breeze";
        case speed < 7.9:
            return "Moderate Breeze";
        case speed < 10.7:
            return "Fresh Breeze";
        case speed < 13.8:
            return "Strong Breeze";
        case speed < 17.1:
            return "Moderate Gale";
        case speed < 20.7:
            return "Gale";
        case speed < 24.4:
            return "Strong Gale";
        case speed < 28.4:
            return "Storm";
        case speed < 32.6:
            return "Violent Storm";
        case speed >= 32.6:
            return "Hurricane Force";
        default:
            return "Error"
    }
});

const windBearing = ((bearing) => {
    let dir;
    switch(true){
        case bearing > 348.75 || bearing <= 11.25:
            return "N";
        case bearing <= 33.75:
            return "NNE";
        case bearing <= 56.25:
            return "NE";
        case bearing <= 78.75:
            return "ENE"
        case bearing <= 101.25:
            return "E"
        case bearing <= 123.75:
            return "ESE";
        case bearing <= 146.25:
            return "SE";
        case bearing <= 168.75:
            return "SSE"
        case bearing <= 191.25:
            return "S"
        case bearing <= 213.75:
            return "SSW";
        case bearing <= 236.25:
            return "SW";
        case bearing <= 258.75:
            return "WSW"
        case bearing <= 281.25:
            return "W"
        case bearing <= 281.75:
            return "WNW";
        case bearing <= 303.25:
            return "NW";
        case bearing <= 348.75:
            return "NNW"
        default:
            return "error"
    }
});
