const total = document.getElementById("total");
const recovered = document.getElementById("recovered");
const deaths = document.getElementById("deaths");
const active = document.getElementById("active");
const closed = document.getElementById("closed");
const timer = document.getElementById("timer");
const lastUpdate = document.getElementById("lastUpdate");

var secondCount = 0;
var interval = 5*60; //in second
var previousCases =  4243748;
var addedCases = 0;
var currentCases = 0;
var averageInffection =0;

var currentDate = new Date();
var lastUpdateDate = new Date('May 11, 2020');

var currentMsec = Date.parse(currentDate);
var lastUpdateDateMsec = Date.parse(lastUpdateDate);
var timeDifferenceMsec = currentMsec - lastUpdateDateMsec;

var accDate = Math.round( parseInt(timeDifferenceMsec) / 86400000 );


function getInfo(){
    fetch('https://covid-simple-api.now.sh/api/world')
        .then((res)=> res.json())
        .then((data)=>{

            currentCases = parseInt(data.totalCases.replace(/,/g,''));
            addedCases = currentCases - previousCases;
            averageInffection = addedCases / accDate;

            total.innerHTML = `<h6>Current ${currentCases.toLocaleString()}<h6><br> 
            From Record Period (${lastUpdateDate}) <h6>Added <span class="badge badge-dark ">${addedCases.toLocaleString()}</span> Cases In ${accDate} Days.</h6> <br><h6 class="text-danger">Average Infection is ${averageInffection.toLocaleString()} Cases Per Day.</h6>` ;
            recovered.innerHTML =data.recovered
            deaths.innerHTML=data.deaths;
            active.innerHTML = data.activeCases;
            closed.innerHTML = data.closedCases;
            lastUpdate.innerHTML = 'Updated '+ currentDate;
        })
}

getInfo();

setInterval(() => {
    secondCount +=1;
        timer.innerHTML = interval-secondCount;
        if (interval-secondCount <=0){
            getInfo();
            secondCount=0;
        }
}, 1000); 