//loading CSS file
let link = document.createElement("link");
link.href = "index.css";
link.rel = "stylesheet";
link.type = "text/css";

link.onload = function () {
  console.log("success");
};

link.onerror = function () {
  console.log("error");
};

const tbody = document.getElementById("tbody");

const rowsPerPage = 10;
const data1 = [];
//api URL
const url = "https://restcountries.eu/rest/v2/all";
read_d(url)


async function getData(requestUrl) {
  fetch(requestUrl)
    .then((res) => res.json())
    .then((data) => {
      makepagination(data);
      for (let i = 0; i < data.length; i++) {
        createRow(data[i]);
      }
      displayRows(1);    
    });
}

function createRow(cityObj) {
  let row_2 = document.createElement("tr");
  let row_2_name = document.createElement("td");
  row_2_name.innerHTML = cityObj.name;
  let row_2_code = document.createElement("td");
  row_2_code.innerHTML = cityObj.alpha3Code;
  let row_2_population = document.createElement("td");
  row_2_population.innerHTML = cityObj.population;
  let row_2_capital = document.createElement("td");
  let forecast_button = document.createElement("button");
  forecast_button.innerHTML='show forecast'
  forecast_button.setAttribute('value',[cityObj.name,cityObj.latlng[0],cityObj.latlng[1]]);
  forecast_button.setAttribute('onclick', 'getforecastData(this.value)');

 

  row_2_capital.innerHTML = cityObj.capital;
  row_2.appendChild(row_2_name);
  row_2.appendChild(row_2_code);
  row_2.appendChild(row_2_population);
  row_2.appendChild(row_2_capital);
  row_2.appendChild(forecast_button);
  tbody.appendChild(row_2);
  data1.push(row_2);
}

function makepagination(data) {
   let numbers = $("#numbers");
  const rowsCount = data.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // avoid decimals
  for (let i = 0; i < pageCount; i++) {
    numbers.append('<li><a href="#">' + (i + 1) + "</a></li>");
  }

  $("#numbers li:first-child a").addClass("active");
  $("#numbers li a").click(function (e) {
    let $this = $(this);
    e.preventDefault();
    // Remove the active class from the links.
    $("#numbers li a").removeClass("active");
    // Add the active class to the current link.
    $this.addClass("active");
    // Show the rows corresponding to the clicked page ID.
    displayRows($this.text());
  });
}

function displayRows(index) {
  let start = (index - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  $(data1).hide();
  $(data1).slice(start, end).show();
}
async function read_d(URL)
{
    let d = await(getData(url))
    console.log("hi");

}

function getforecastData(latlon){
 latlon=latlon.split(',')
 let forecast_URL='https://api.openweathermap.org/data/2.5/weather?lat='+latlon[1]+'&lon='+latlon[2]+'&appid=a2ff011b5179ee575a4f7cc438ae210c';
 fetch(forecast_URL)
    .then((res) => res.json())
    .then((data) => {
      forecast_div(data,latlon[0]);
    
    });
}

function forecast_div(data,city_name){
    let div_w=(document.getElementById('weather_div'));
    let weather_main=data.weather[0].main

    div_w.style.display='block'
    document.getElementById('city_name').innerHTML=city_name;
    document.getElementById('for_main').innerHTML=weather_main;
    icon=document.getElementById('for_icon')
    if(weather_main.includes('Clear'))
      icon.innerHTML='<i class="fas fa-sun"></i>'  
    else if (weather_main.includes('Clouds'))
    icon.innerHTML='<i class="fas fa-cloud"></i>'  
    else icon.innerHTML='<i class="fas fa-cloud-rain"></i>'
    document.getElementById('temp').innerHTML=(data.main.temp-272.15).toFixed(2)+'&#176';
}