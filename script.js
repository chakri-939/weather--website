const website=document.querySelector('.weather-website');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.wind');
const form=document.querySelector('locatioInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');

let cityInput="London";
cities.forEach((city) => {
    city.addEventListener('click',(e)=>{
        cityInput=e.target.innerhtml;
        fetchWeatherData()
        website.style.opacity="0";
    });
});

form.addEventListener('submit',(e)=>{
    cityInput=search.value;
    fetchWeatherData()
    search.value=''
    website.style.opacity="0";
    e.preventDefault();
});
function dayOfTheWeek(day,month,year){
    const weekday=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date('${day/${month}/${year}').getDay()]
};
function fetchWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=829211345d440917b9734d27715fe4ef')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML=data.current.temp_c + "&#176;";
        conditionOutput.innerHTML= data.current.condition.text;
        const date = data.location.localtime;
        const y=parseInt(date.substr(0,4))
        const m=parseInt(date.substr(5,2))
        const d=parseInt(date.substr(8,2))
        const time = date.substr(11);
        dateOutput.innerHTML='${dayOfTheWeek(d,m,y)}${d},${m}${y}';
        timeOutput.innerHTML=time;
        nameOutput.innerHTML=data.location.name;
        cloudOutput.innerHTML=data.current.cloud +"%";
        humidityOutput.innerHTML=data.current.humidity +"%";
        windOutput.innerHTML=data.current.wind_kph+"kp/h";
    fetchWeatherData();
    website.style.opacity="1";
});
};