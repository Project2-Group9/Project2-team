fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=cwshRwNxcHM0xw3n2EbfuwFC2OjcPim1')

        .then(function (response){
            return response.json();
        })

        .then(function(jsonResult){
            console.log('response', jsonResult);
        })