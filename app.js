
document.getElementById("celcius").addEventListener("click", function(){
    tempType = true;
    document.getElementById("celcius").style.color = "#F67280";
    document.getElementById("fahrenheit").style.color = "#AAAAAA";
    changeTempType()
}) 
document.getElementById("fahrenheit").addEventListener("click", function(){
    tempType = false;
    document.getElementById("fahrenheit").style.color = "#F67280";
    document.getElementById("celcius").style.color = "#AAAAAA";
    changeTempType()
}) 

var temp;
var tempType = true;

window.addEventListener("load", ()=> {

    let long;
    let lat;

    const proxy = "http://cors-anywhere.herokuapp.com/";
    const apiIpStack = "http://api.ipstack.com/check?access_key=fe86dbb2256b138059371429fd37c3c3"

    //get Location
    fetch("https://ipapi.co/json/")
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
                    const daily = data.daily.data;

                    temp = temperature;
                    console.log(daily);

                    //set DOM Elements 
                    document.getElementById("degree").innerHTML = convertCelcius(temp, tempType);
                    document.getElementById("location").innerHTML = city;
                    document.getElementById("summary").innerHTML = summary;

                    let containerForcast = document.getElementById("container-forecast");
                    let containerItemsForcast = containerForcast.children;

                    for(let i = 0; i < containerItemsForcast.length; i++)
                    {
                        containerItemsForcast[i].innerHTML = daily[i].summary;
                    }

                    //set today icon
                    setIcons(icon, document.querySelector("#icon"));
                })
        })
})

function setIcons(icon, iconID)
    {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

function convertCelcius(degree, tempType)
{
    if(tempType)
    {
        return  Math.round((5/9) * (degree - 32) * 100) / 100 + " °C";
    }
    
    if(!tempType)
    {
        return degree * 9 / 5 + 32 + " °F";
    }
}

function changeTempType()
{
    document.getElementById("degree").innerHTML = convertCelcius(temp, tempType);
}


