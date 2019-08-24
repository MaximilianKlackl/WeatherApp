//l1na2zqf.ygp@20minutemail.it

document.getElementById("celcius").addEventListener("click", function()
{
    //styling
    document.getElementById("celcius").style.color = "#F67280";
    document.getElementById("fahrenheit").style.color = "#AAAAAA";

    let celcius = document.getElementById("degree").innerHTML; 

    document.getElementById("degree").innerHTML = round(convert(celcius));

    //FORECAST:
    //change °C to °F
    let containerForcast = document.getElementById("container-forecast");
    let containerItemsForcast = containerForcast.children;

    for(let i = 0; i < containerItemsForcast.length; i++)
    {
        let children = containerItemsForcast[i].children;
        let celcius2 = children[2].innerHTML;
        children[2].innerHTML = round(convert(celcius2));
    }

}) 

document.getElementById("fahrenheit").addEventListener("click", function(){

    
    //styling
    document.getElementById("fahrenheit").style.color = "#F67280";
    document.getElementById("celcius").style.color = "#AAAAAA";

    //change °C to °F
    let fahrenheit = document.getElementById("degree").innerHTML;  
    document.getElementById("degree").innerHTML =  round(convert(fahrenheit));

    let containerForcast = document.getElementById("container-forecast");
    let containerItemsForcast = containerForcast.children;

    for(let i = 0; i < containerItemsForcast.length; i++)
    {
        let children = containerItemsForcast[i].children;
        let fahrenheit2 = children[2].innerHTML;
        children[2].innerHTML =  round(convert(fahrenheit2));
    }
    
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

            const apiDarkSky = proxy + "https://api.darksky.net/forecast/3070627887db61a220265cc9ddb3a757/" + lat + "," + long;

            fetch(apiDarkSky)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    console.log(data)

                    const {summary, icon} = data.currently;
                    const daily = data.daily.data;

                    let temperature = data.currently.temperature + " °F";
                    console.log(daily);

                    //set DOM Elements 
                    document.getElementById("degree").innerHTML =  round(convert(temperature));
                    document.getElementById("location").innerHTML = city;
                    document.getElementById("summary").innerHTML = summary;

                    let containerForcast = document.getElementById("container-forecast");
                    let containerItemsForcast = containerForcast.children;
                    console.log(containerItemsForcast);

                    for(let i = 0; i < containerItemsForcast.length; i++)
                    {
                        let children = containerItemsForcast[i].children;
                        children[0].innerHTML = convertTime(daily[i].time);
                        setIcons(daily[i].icon, children[1], "#333333");
                        children[2].innerHTML =  round(convert(((daily[i].temperatureLow + daily[i].temperatureHigh)/2 + " °F")));
                        children[3].innerHTML = daily[i].summary;
                    }

                    //set today icon
                    setIcons(icon, document.querySelector("#icon"), "white");
                })
        })
})

function setIcons(icon, iconID, colorID)
{
    const skycons = new Skycons({ color: colorID });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

function convertTime(unixTime){

    // Unixtimestamp
    var unixtimestamp = unixTime;
   
    // Months array
    var months_arr = ['January','February','March','April','May','June','July','August','Septemper','October','November','December'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+' '+day+'th';
    
    return convdataTime;
}

function convert(temp)
{
    temp += "";
    let sign = temp.substring(temp.length, temp.length -3);
    let degree = temp.substring(0, temp.length-3);

    if(sign == " °F")
    {
        return  (degree - 32) * (5/9) + " °C";
    }
    if(sign == " °C")
    {
        return (degree * (9/5)) + 32 + " °F";
    }
}

function round(num)
{
    let sign = num.substring(num.length, num.length -3);
    degree = num.substring(0, num.length-3);
    return Math.round(degree * 100) / 100 + sign;
}