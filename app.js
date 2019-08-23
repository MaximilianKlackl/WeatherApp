//l1na2zqf.ygp@20minutemail.it

setDefaultTempType();

function setDefaultTempType()
{
    if(localStorage.getItem("tempType") == null)
    {
        localStorage.setItem("tempType", "true");
    }
}

document.getElementById("celcius").addEventListener("click", function()
{
    if(localStorage.getItem("tempType") == "false")
    {
        console.log("1");
        document.getElementById("celcius").style.color = "#F67280";
        document.getElementById("fahrenheit").style.color = "#AAAAAA";

        localStorage.removeItem("tempType");
        localStorage.setItem("tempType", "true");
        let beforeTemp = document.getElementById("degree").innerHTML; 
        let slicedTemp = beforeTemp.substring(0, beforeTemp.length-2);
        document.getElementById("degree").innerHTML = Math.round(convertTemp(slicedTemp) * 100) / 100 + " °C";

        let containerForcast = document.getElementById("container-forecast");
        let containerItemsForcast = containerForcast.children;

        for(let i = 0; i < containerItemsForcast.length; i++)
        {
            let children = containerItemsForcast[i].children;
            let beforeTemp = children[2].innerHTML;
            let slicedTemp = beforeTemp.substring(0, beforeTemp.length-2);
            children[2].innerHTML = Math.round(convertTemp(slicedTemp) * 100) / 100 + " °C";
        }
    }
}) 

document.getElementById("fahrenheit").addEventListener("click", function(){

    if(localStorage.getItem("tempType") === "true")
    {
        console.log("2");

        document.getElementById("fahrenheit").style.color = "#F67280";
        document.getElementById("celcius").style.color = "#AAAAAA";

        localStorage.removeItem("tempType");
        localStorage.setItem("tempType", "false");
        let beforeTemp = document.getElementById("degree").innerHTML; 
        let slicedTemp = beforeTemp.substring(0, beforeTemp.length-2);
        document.getElementById("degree").innerHTML = Math.round(convertTemp(slicedTemp) * 100) / 100  + " °F";

        let containerForcast = document.getElementById("container-forecast");
        let containerItemsForcast = containerForcast.children;

        for(let i = 0; i < containerItemsForcast.length; i++)
        {
            let children = containerItemsForcast[i].children;
            let beforeTemp = children[2].innerHTML;
            let slicedTemp = beforeTemp.substring(0, beforeTemp.length-2);
            children[2].innerHTML = Math.round(convertTemp(slicedTemp) * 100) / 100 + " °F";
        }
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

                    const {temperature, summary, icon} = data.currently;
                    const daily = data.daily.data;

                    console.log(daily);

                    //set DOM Elements 
                    document.getElementById("degree").innerHTML = Math.round((convertTemp(temperature)) * 100) / 100 + getTempSign();
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
                        children[2].innerHTML =  Math.round((convertTemp((daily[i].temperatureLow + daily[i].temperatureHigh) / 2)) * 100) / 100 + getTempSign();
                        children[3].innerHTML = daily[i].summary;
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
    if(localStorage.getItem("tempType") == "true")
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
    var months_arr = ['January','February','March','April','May','June','July','August','Septemper','October','November','December'];
   
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

function getTempSign()
{
    if(localStorage.getItem("tempType") == "true")
    {
        return " °C";
    }
    else
    {
        return " °F";
    }
}