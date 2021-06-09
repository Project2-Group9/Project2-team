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
// const formEl = document.querySelector('form');
// const city = []
// formEl.addEventListener('submit', function(event){
//   event.preventDefault();
//   const inputEl = document.querySelector('input[type=text]');
//     city.push(inputEl.value);
  
  
//   // setting base url?
function getEvents(city) {
  // setting base url?
  const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
  url.search = new URLSearchParams({
    apikey: 'X4inC7WFIbCIszNWQJSMcDLteLVtz85Z',
    city: [city],
  });
  //function that updates the city parameter
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const eventsArray = data['_embedded'].events;
      // console.log(eventsArray);
      displayEvents(eventsArray);
    });
}

function displayEvents(eventsArray) {
  // clear ul before adding new events
  document.querySelector('.events').innerHTML = '';

  eventsArray.forEach((item) => {
    const li = document.createElement('li');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('imgDiv');

    const img = document.createElement('img');
    // set img src and alt attributes
    // grab last image from the inner image array
    img.src = item.images[item.images.length - 1].url;

    imgDiv.append(img);

    //

    const textDiv = document.createElement('div');
    textDiv.classList.add('textDiv');

    const eventName = document.createElement('h3');
    eventName.innerText = item.name;

    const eventLink = document.createElement('a');
    eventLink.innerText = 'More Info';
    // todo: check if URL works?
    eventLink.href = item.url;

    const eventDescription = document.createElement('p');
    // check for description
    if (item.description) {
      eventDescription.innerText = item.description;
    } else {
      eventDescription.innerText = item.pleaseNote;
    }

    textDiv.append(eventName, eventLink, eventDescription);

    //
    li.append(imgDiv, textDiv);

    // grab ul from html
    document.querySelector('.events').append(li);
  });
}

const formEl = document.querySelector('form');
const city = [];
formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputEl = document.querySelector('input[type=text]');
  const inputValue = inputEl.value;
  getEvents(inputValue);
  
});



// // setting base url?
// const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
// url.search.city = city;
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
//   console.log(url.search);
// });


// setting base url?
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
  // });

