// fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=cwshRwNxcHM0xw3n2EbfuwFC2OjcPim1')

//         .then(function (response){
//             return response.json();
//         })

//         .then(function(jsonResult){
//             console.log('response', jsonResult);
//         })

// const eventsApp = {};

// eventsApp.url = 'https://app.ticketmaster.com/discovery/v2/events';
// eventsApp.key = 'cwshRwNxcHM0xw3n2EbfuwFC2OjcPim1'

// eventsApp.getInfo = () => {
//     const apiURL = new URL (galleryApp.url);
//     apiURL.search = new URLSearchParams({
//         client_id: galleryApp.key, per_page:20
//     })

//     fetch (apiUrl)
//     .then(results => {
//         return results.json()
//     })

//     .then(jsonRes =>{
//         eventsApp.displayInfo(jsonRes)
//     })
// }

// eventsApp.getInfo = (dataFromApi) => {
//     console.log(dataFromApi)

//     eventsApp.init = () => {
//         eventsApp.getInfo()
//     }

// }

// eventsApp.init();

const formEl = document.querySelector('form');
const city = []
formEl.addEventListener('submit', function(event){
  event.preventDefault();
  const inputEl = document.querySelector('input[type=text]');
    city.push(inputEl.value);
  
  
  // setting base url?
const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
url.search.city = city;
url.search = new URLSearchParams({
  apikey: 'X4inC7WFIbCIszNWQJSMcDLteLVtz85Z',
  city: [''],
  //function that updates the city parameter

});

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data['_embedded']);
    const eventsArray = data['_embedded'].events;
    const eventName = data['_embedded'].events[0].name;
    console.log(eventName);
    document.querySelector('h3').innerText = eventName;
  });
  console.log(url.search);
});


// // setting base url?
// const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
// url.search = new URLSearchParams({
//   apikey: 'X4inC7WFIbCIszNWQJSMcDLteLVtz85Z',
//   city: [''],
//   //function that updates the city parameter
// });
// fetch(url)
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (data) {
//     console.log(data['_embedded']);
//     const eventsArray = data['_embedded'].events;
//     const eventName = data['_embedded'].events[0].name;
//     console.log(eventName);
//     document.querySelector('h3').innerText = eventName;
//   });