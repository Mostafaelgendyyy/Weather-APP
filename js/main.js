var search=document.getElementById('searchId')
var searchFind=document.getElementById('findID')
var home=document.getElementById('home')
var contact=document.getElementById('contact')
var contactSection=document.getElementById('contactSection')
var homeHeader=document.getElementById('homeHeader')
var h1Id=document.getElementById('h1Id')
var contactHome=document.getElementById('contactHome')
var loadingId=document.getElementById('loadingId')

search.addEventListener('keyup',function(){
  var country= search.value
  weather(country)
})
searchFind.addEventListener('click',function(){
  var country= search.value
  weather(country)
})


var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function countryLocation() {
  navigator.geolocation.getCurrentPosition(async function (position) {
    var lati = position.coords.latitude;
    var long = position.coords.longitude;
    
    var city=await getCountryName(lati, long)
    weather(city)
    
       
    
})
}
document.body.classList.add('loading-active');
loadingId.style.display='block'
async function weather(nameOfCity) {
  
  var data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=06884d8390fa4908b85134814240401&q=${nameOfCity}&days=3&aqi=no&alerts=no`
  );
  var response = await data.json();

  loadingId.style.display='none'
  document.body.classList.remove('loading-active');
  display_currentday(response.location,response.current);
  displayAnother(response.forecast.forecastday);
}

async function getCountryName(latitude, longitude) {

  var data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  var response = await data.json();
  return response.address.country
  
  
}

countryLocation()


function display_currentday(location,currentday)
{
  var current_date=new Date(currentday.last_updated);
  cartona = `
    <div class="col-md-4 bg-danger px-0 rounded-start-4 overflow-hidden h-100 coll1">
            <div class="d-flex justify-content-between p-2 countryDate ">
              <span>${days[current_date.getDay()]}</span>
              <span>${current_date.getDate() + current_date.toLocaleDateString("en-US", { month: "long" })}</span>
            </div>
            <div class="d-flex flex-column p-4 cityWeather">
              <span class="text-capitalize">${(location.name).split(' ')[0]}</span>
              <h2 class="percentage text-white">${currentday.temp_c}<sup>o</sup>C</h2>
            
            <img src="https:${currentday.condition.icon}" alt="" class="sunImage">
            <span class="my-3 text-info">"${currentday.condition.text}"</span>
            <div class="d-flex ">
              <div>
                <img src="img/icon-umberella.png" alt="">
                <span class="me-3">20%</span>

              </div>
              <div>
                <img src="img/icon-wind.png" alt="">
                <span class="me-3">18km/h</span>
              </div>
              <div>
                <img src="img/icon-compass.png" alt="">
                <span class="me-3">East</span>
              </div>
            </div>
          </div>
        </div>
    `;
  document.getElementById("rowId").innerHTML = cartona;

}
function displayAnother(anotherdata) {
  
  normal_class = 'col-md-4 px-0 h-100';
  last_class = 'col-md-4 px-0 h-100 rounded-end-4 overflow-hidden coll2'
  for (let iterator = 1 ; iterator <anotherdata.length; iterator++)
  {
    cartona = `
        <div class="${iterator == (anotherdata.length - 1) ? last_class : normal_class}">
          <div class="d-flex justify-content-center p-2 countryDate${iterator+1} ">
            <span>${days[new Date(anotherdata[iterator].date).getDay()]}</span>
            
          </div>
          <div class="d-flex flex-column align-items-center p-5 cityWeather${iterator+1}">
              <img src="https:${anotherdata[iterator].day.condition.icon}" alt="" class="sunImage2">
              
              <h2 class=" text-white my-3">${anotherdata[iterator].day.maxtemp_c}<sup>o</sup>C</h2>
              <span class="upSunny">${anotherdata[iterator].day.mintemp_c}</span>
            
            
            <span class="my-3 text-info">${anotherdata[iterator].day.condition.text}</span>
            
          </div>
        </div>
      `;
    document.getElementById("rowId").innerHTML += cartona;
  }
}


contact.addEventListener('click',function(){
  contact.classList.add('active')
  home.classList.remove('active')
  contactSection.classList.replace('contactSection','block')
  homeHeader.classList.replace('block','none')
  h1Id.innerHTML='Company Name'

})
home.addEventListener('click',function(){
  home.classList.add('active')
  contact.classList.remove('active')
  contactSection.classList.replace('block','contactSection')
  homeHeader.classList.add('block')
  h1Id.innerHTML='Weather'


})
contactHome.addEventListener('click',function(){
  homeHeader.classList.add('block')
  contactSection.classList.replace('block','contactSection')
  home.classList.add('active')
  contact.classList.remove('active')
  h1Id.innerHTML='Weather'
})