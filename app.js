var temperatureType = localStorage.getItem("tempType")

setDefaultTempType();

function setDefaultTempType()
{
    if(localStorage.getItem("tempType") == null)
    {
        localStorage.setItem("tempType", true);
    }
}

document.getElementById("celcius").addEventListener("click", function(){

    document.getElementById("celcius").style.color = "#F67280";
    document.getElementById("fahrenheit").style.color = "#AAAAAA";

    temperatureType = true;
    localStorage.removeItem("tempType");
    localStorage.setItem("tempType", true);
    document.getElementById("degree").innerHTML = convertTemp(document.getElementById("degree").innerHTML) + " °C";
}) 
document.getElementById("fahrenheit").addEventListener("click", function(){

    document.getElementById("fahrenheit").style.color = "#F67280";
    document.getElementById("celcius").style.color = "#AAAAAA";

    temperatureType = false;
    localStorage.removeItem("tempType");
    localStorage.setItem("tempType", false);
    document.getElementById("degree").innerHTML = convertTemp(document.getElementById("degree").innerHTML) + " °F";
}) 

window.addEventListener("load", ()=> {

    let long;
    let lat;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const ipApi = "https://ipapi.co/json/"

    //get Location
    fetch(ipApi)
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data);
            lat = data.latitude;
            long = data.longitude;
            const city = data.city;

            const apiDarkSky = proxy + "https://api.darksky.net/forecast/a5b5c018f91a6f7e9159f2b8589203f2/" + lat + "," + long;

            fetch(apiDarkSky)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    console.log(data)

                    const {temperature, summary, icon} = data.currently;
                    const daily = data.daily.data;

                    console.log(daily);

                    //set DOM Elements 
                    document.getElementById("degree").innerHTML = Math.round(convertTemp(temperatureType, temperature) * 100) / 100;
                    document.getElementById("location").innerHTML = city;
                    document.getElementById("summary").innerHTML = summary;

                    let containerForcast = document.getElementById("container-forecast");
                    let containerItemsForcast = containerForcast.children;
                    console.log(containerItemsForcast);

                    for(let i = 0; i < containerItemsForcast.length; i++)
                    {
                        let children = containerItemsForcast[i].children;
                        children[0].innerHTML = convertTime(daily[i].time);
                        setIcons(daily[i].icon, children[1]);
                        children[2].innerHTML = (daily[i].temperatureLow + daily[i].temperatureHigh) / 2;
                        //containerItemsForcast[i].innerHTML = daily[i].summary;
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

function convertTemp(degree)
{
    if(localStorage.getItem("tempType"))
    {
        return (degree - 32) * (5/9);
    }
    else
    {
        return (degree * (9/5)) + 32;
    }
}

function convertTime(unixTime){

    // Unixtimestamp
    var unixtimestamp = unixTime;
   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+' '+day+'th '+year;
    
    return convdataTime;
   }
