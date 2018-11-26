// Callbacks

// const cities = ['London', 'New York', 'Madrid', 'Paris', 'Berlin'];

// Inline callbacks
// cities.forEach(function (city){
//  console.log(city);
// });

// callback with function declaration
// function callback(city){
//  console.log(city);
// }
// cities.forEach(callback);

const countries = ['France', 'Spain', 'Portugal', 'Australia', 'England', 'Ireland'];

function newCountry(country, callback) {
 setTimeout(function(){
  // Add new Country
  countries.push(country);

  // Execute the callback
  callback();
 }, 2000);
}
// Add a new country
newCountry('Germany', displayCountries);
// Display thre countires after 1 second
function displayCountries() {
 setTimeout(function () {
  let html = '';
  countries.forEach(function(country){
   html += `<li>${country}</li>`;
  });
  document.body.innerHTML = html;
 }, 1000);
}

// Print the countries
displayCountries();