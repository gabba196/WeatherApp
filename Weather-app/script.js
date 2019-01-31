window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition => {
            long = showPosition.coords.longitude;
            lat = showPosition.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/6ee48f63762e07084e46c7d4dc2878b9/${lat},${long}`;

            fetch(api)
                .then(response => {
                      return response.json();
                  })
                .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;


                // Set DOM Elements From API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Fahrenheit To Celsius Formula
                let celsius = (temperature - 32) * (5 / 9);


                // Set Skycon Icons
                setIcons(icon, document.querySelector('.icon'));


                // Fahrenheit To Celsius Button Change
                tempSection.addEventListener('click', () => {
                    if (tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = Math.floor(celsius);
                    } else {
                        tempSpan.textContent = 'F';
                        tempDegree.textContent = temperature;
                    }
                })
                  });  
        });

    } else {
        h1.textContent = 'This web application requires your geolocation to work. Please enable this on your machine to continue.';
    }

    function setIcons (icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play(); 
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
