function handleApiResponse(response){console.log(response);

    document.querySelector("#temp").innerHTML=Math.round(response.data.main.temp);
    document.querySelector("#city-name").innerHTML=response.data.name;
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    document.querySelector("#wind").innerHTML=Math.round(3.6*response.data.wind.speed);
    document.querySelector("#description").innerHTML=response.data.weather[0].description;
}



let apiKey="dbf20d5c78580523bd2bd1f7ce5630d5";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=babol&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(handleApiResponse);



