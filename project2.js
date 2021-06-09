

function getEvents(city, startDate, endDate) {
  // setting base url?
  const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
  url.search = new URLSearchParams({
    apikey: 'X4inC7WFIbCIszNWQJSMcDLteLVtz85Z',
    city: [city],
    localStartDateTime: [`${startDate}T14:00:00`, `${endDate}T14:00:00`]
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

const formEl = document.querySelector('form');


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

    const textDiv = document.createElement('div');
    textDiv.classList.add('textDiv');

    const eventName = document.createElement('h3');
    eventName.innerText = item.name;

    const eventLink = document.createElement('a');
    eventLink.innerText = 'More Info';
    // todo: check if URL works?
    eventLink.href = item.url;


    const eventDate = document.createElement('p');
    eventDate.innerText = item.dates.start.localDate;


    const eventDescription = document.createElement('p');
    // check for description
    if (item.description) {
      eventDescription.innerText = item.description;
    } else {
      eventDescription.innerText = item.pleaseNote;
    }

    textDiv.append(eventName, eventLink, eventDate, eventDescription);

    //
    li.append(imgDiv, textDiv);

    // grab ul from html
    document.querySelector('.events').append(li);
  });
}

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputEl = document.querySelector('input[type=text]');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  const inputValue = inputEl.value;
  const startValue = startDate.value;
  const endValue = endDate.value;

  getEvents(inputValue, startValue, endValue);
  
});


