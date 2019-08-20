window.addEventListener("load", ()=> {

    let long;
    let lat;

    const proxy = "http://cors-anywhere.herokuapp.com/";
    const apiIpStack = "http://api.ipstack.com/check?access_key=fe86dbb2256b138059371429fd37c3c3"

    //get Location
    fetch(apiIpStack)
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data);
            lat = data.latitude;
            long = data.longitude;
            const city = data.city;

            const apiDarkSky = proxy + "https://api.darksky.net/forecast/8e509d3eb2cbe9f1c949a54e7d7e59fb/" + lat + "," + long;

            fetch(apiDarkSky)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    console.log(data)
                    const {temperature, summary, icon} = data.currently;

                    //set DOM Elements 
                    document.getElementById("degree").innerHTML = convertCelcius(temperature);
                    document.getElementById("location").innerHTML = city;
                    document.getElementById("summary").innerHTML = summary;

                    //set Icon
                    setIcons(icon, document.querySelector("#icon"));
                })
        })

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({ color: "black" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function convertCelcius(fahrenheit)
    {
        let celcius = Math.round((5/9) * (fahrenheit - 32) * 100) / 100;
        return celcius;
    }
})

