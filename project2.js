// helper function
// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

function getEvents(city, startDate, endDate) {
  // setting base url?
  const url = new URL('https://app.ticketmaster.com/discovery/v2/events');
  url.search = new URLSearchParams({
    apikey: 'X4inC7WFIbCIszNWQJSMcDLteLVtz85Z',
    city: [city],
    localStartDateTime: [`${startDate}T14:00:00`, `${endDate}T14:00:00`],
    sort: 'date,asc',
    size: '30',
  });
  //function that updates the city parameter
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.page.totalElements > 0) {
        const eventsArray = data['_embedded'].events;
        // console.log(data);
        displayEvents(eventsArray);
      } else {
        // clear ul
        document.querySelector('.events').innerHTML = '';
        const noEventText = document.createElement('h4');
        noEventText.innerText =
          'Sorry, looks like there are no events in this area right now.';

        document.querySelector('.events').appendChild(noEventText);

        const resultsHeader = document.querySelector('.resultsHeader');
        const html = document.querySelector('html');

        resultsHeader.style.display = 'inline';
        html.style.overflow = 'visible';

        const results = document.querySelector('#results');

        const offset = results.offsetTop;

        scroll({
          top: offset,
          behavior: 'smooth',
        });
      }
    });
}

const formEl = document.querySelector('form');

function displayEvents(eventsArray) {
  // clear ul before adding new events
  document.querySelector('.events').innerHTML = '';

  const filteredEvents = eventsArray.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj.name === item.name),
  );

  filteredEvents.forEach((item) => {
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
    eventLink.target = '_blank';

    const eventDate = document.createElement('p');
    eventDate.innerText = item.dates.start.localDate;

    const eventDescription = document.createElement('p');
    // check for description
    if (item.description) {
      const maxLength = 250;
      if (item.description.length > maxLength) {
        eventDescription.innerText = truncate(item.description, maxLength);
      } else {
        eventDescription.innerText = item.description;
      }
    } else if (item.pleaseNote) {
      const maxLength = 250;
      eventDescription.innerText = item.pleaseNote;
      if (item.pleaseNote.length > maxLength) {
        eventDescription.innerText = truncate(item.pleaseNote, maxLength);
      } else {
        eventDescription.innerText = item.pleaseNote;
      }
    } else {
      eventDescription.innerText = 'No event description to display';
    }

    textDiv.append(eventName, eventDate, eventLink, eventDescription);

    //
    li.append(imgDiv, textDiv);

    // grab ul from html
    document.querySelector('.events').append(li);
  });

  // display results header
  const resultsHeader = document.querySelector('.resultsHeader');
  resultsHeader.style.display = 'inline';

  // allow scroll when results return

  const html = document.querySelector('html');

  html.style.overflow = 'visible';

  // scroll to results after data is on the page
  // https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165
  const results = document.querySelector('#results');

  const offset = results.offsetTop;

  scroll({
    top: offset,
    behavior: 'smooth',
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
