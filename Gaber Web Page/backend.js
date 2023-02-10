
//ask ahmed about which values are constants that need to be easy to access eg gallonover220

//******************************THESE ARE THE CONSTANT VARIABLES FOR THE EXCEL SHEET*****************
const averageVolume =[0.02,0.14,0.2,0.1,0.275,0,2.72]; // cell f6-f12
const costPerVolume = 3;
const payBackConst = 3000+1500+1000
var totalWaterConsumed = []; //initializing the g column array 

function calculateAsItIs(){
    var totalWater = 0;
    // here we are calculating the total water consumed column (g6-g12) and appending to a list

    var cellInfo = JSON.parse(sessionStorage.firstTableInfo);//in form {key:value,key:value}
    var counter = 0;// this is to go through three key/value pairs at a time
    var counter2 =0; //this is for indeces for column f array
    var placeholder = 1;

    for (var key in cellInfo){
        if (counter2==6){
            placeholder *= averageVolume[counter2];
            totalWaterConsumed.push(placeholder);
            break;
        }
        if(counter >= 3){
                counter = 0;
                placeholder *= averageVolume[counter2];
                counter2++;
                totalWaterConsumed.push(placeholder);
                placeholder = 1
        }
        placeholder *= cellInfo[key];
        counter++;
    }
    for (const volume of averageVolume){
        totalWater+=volume;
    }
    sessionStorage.setItem("columnG",totalWaterConsumed);

    //now we loop through the g column to get the final as it is calculations

    var totalWaterPerDay = 0;
    var costPerDay = 0;
    var colG = (sessionStorage.getItem("columnG")).split(","); //split the string of numbers returned into arr
    for (var i = 0; i<colG.length;i++){
        colG[i] = parseFloat(colG[i]);
    }
    for (const g of colG){
        totalWaterPerDay += g;
        costPerDay += (g*costPerVolume);
    }
    var costPerMonth = costPerDay*30;
    var costPerYear = costPerMonth*12;

    //round all as it is vars to two decimal places 
    totalWaterPerDay = totalWaterPerDay.toFixed(2);
    //totalWaterPerDay = Math.round(totalWaterPerDay); // round up to 5 
    costPerDay = costPerDay.toFixed(2);
    costPerMonth = costPerMonth.toFixed(2);
    costPerYear = costPerYear.toFixed(2);

    sessionStorage.setItem("totalWaterPerDay", totalWaterPerDay);
    sessionStorage.setItem("costPerDay", costPerDay);
    sessionStorage.setItem("costPerMonth",costPerMonth);
    sessionStorage.setItem("costPerYear", costPerYear);

    document.getElementById("totalWater").innerHTML = sessionStorage.getItem("totalWaterPerDay");
    document.getElementById("costPerVolume").innerHTML = costPerVolume;
    document.getElementById("costPerDay").innerHTML = sessionStorage.getItem("costPerDay");
    document.getElementById("costPerYear").innerHTML = sessionStorage.getItem("costPerYear");

    var s1Recycle = 0;
    for (var j = 1; j<5;j++){
        s1Recycle+=colG[j];
    }
    s1Recyle = parseInt(s1Recycle,10);
    var s1Usage =totalWaterPerDay - s1Recycle;
    var s1CPD = (s1Usage*costPerVolume).toFixed(2);
    var s1CPY = (s1CPD*365).toFixed(2);
    var s1Savings = (costPerYear-s1CPY).toFixed(2);
    var s1Payback = (payBackConst/s1Savings).toFixed(3);
    //console.log(s1Recycle, s1Usage, s1CPD, s1CPY, s1Savings, s1Payback);
    
    document.getElementById("totalWaterRecycledS1").innerHTML = s1Recycle.toFixed(2);
    document.getElementById("totalWaterS1").innerHTML = s1Usage;
    document.getElementById("costPerVolumeS1").innerHTML = costPerVolume;
    document.getElementById("costPerDayS1").innerHTML = s1CPD;
    document.getElementById("costPerYearS1").innerHTML = s1CPY;
    document.getElementById("savingsFromCityCostPerYearS1").innerHTML = s1Savings;
    document.getElementById("paybackS1").innerHTML = s1Payback;

    //now we get the s2 vars to put in

    var s2Recycle = s1Recycle + parseFloat(sessionStorage.getItem("s2Divisor"));
    var s2Usage = totalWaterPerDay - s2Recycle;
    var s2CPD = (s2Usage*costPerVolume).toFixed(2);
    var s2CPY = (s2CPD*365).toFixed(2);
    var s2Savings = (costPerYear-s2CPY).toFixed(2);
    var s2Payback = (payBackConst/s2Savings).toFixed(3);

    document.getElementById("totalWaterRecycledS2").innerHTML = s2Recycle.toFixed(2);
    document.getElementById("totalWaterS2").innerHTML = s2Usage;
    document.getElementById("costPerVolumeS2").innerHTML = costPerVolume;
    document.getElementById("costPerDayS2").innerHTML = s2CPD;
    document.getElementById("costPerYearS2").innerHTML = s2CPY;
    document.getElementById("savingsFromCityCostPerYearS2").innerHTML = s2Savings;
    document.getElementById("paybackS2").innerHTML = s2Payback;

    document.getElementById("scenario2table").style.display = "none";
    document.getElementById("scenario1table").style.display = "none";

    console.log(s2Recycle, s2Usage, s2CPD, s2CPY, s2Savings);
}
function scenario1(){
    document.getElementById("scenario1table").style.display = "initial";
    document.getElementById("scenario2table").style.display = "none";
}

function scenario2(){
    document.getElementById("scenario2table").style.display = "initial";
    document.getElementById("scenario1table").style.display = "none";
}
function both(){
    document.getElementById("scenario2table").style.display = "initial";
    document.getElementById("scenario1table").style.display = "initial";
}

function userRoofArea(){
    var area = document.getElementById("roofValue").value;
    var rainInches = document.getElementById("amountRain").value;
    sessionStorage.setItem("rainPerYear", rainInches);
    sessionStorage.setItem("roofArea", area);
    document.getElementById("clientArea").innerHTML = sessionStorage.getItem("roofArea");
    document.getElementById("clientRain").innerHTML = sessionStorage.getItem("rainPerYear");


    //calculate the values to be input in the rainwater harvest
    var gallons = area*rainInches*0.623;
        gallons = gallons.toFixed(2);
    var gallonOver220 = gallons/220;
        gallonOver220 =gallonOver220.toFixed(2);
    var dailyCollect = gallonOver220/365;
        dailyCollect = dailyCollect.toFixed(2);

    //send above vars to function that inserts calculations in table
    rainwaterValues(gallons, gallonOver220, dailyCollect);
    sessionStorage.setItem("s2Divisor",dailyCollect);
}

function rainwaterValues (x,y,z){
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
    document.getElementById("z").innerHTML = z;

}

function userInfo(){
    //get the values from the form as variables
    var first = document.getElementById("first_name").value;
    var last = document.getElementById("last_name").value;
    var addy = document.getElementById("address").value;
    var cell = document.getElementById("number").value;
    var postal = document.getElementById("postal").value;

    //assign each var to a session item
    sessionStorage.setItem("firstName", first);
    sessionStorage.setItem("lastName", last);
    sessionStorage.setItem("address",addy);
    sessionStorage.setItem("number",cell);
    sessionStorage.setItem("postal",postal);
}

//get the information from second page table
// function numPeople(){
//     var people = document.getElementById("people").value;
//     sessionStorage.setItem("numPeople", people);
//     console.log("test")
// }

function consumptionInfo (){

    var people = document.getElementById("people").value;
    sessionStorage.setItem("numPeople", people);
    // console.log(numPeople)

    var c6= document.getElementById("c6").value;
    // var d6= document.getElementById("d6").value;
    var e6= document.getElementById("e6").value;

    var c7= document.getElementById("c7").value;
    // var d7= document.getElementById("d7").value;
    var e7= document.getElementById("e7").value;

    var c8= document.getElementById("c8").value;
    // var d8= document.getElementById("d8").value;
    var e8= document.getElementById("e8").value;

    var c9= document.getElementById("c9").value;
    // var d9= document.getElementById("d9").value;
    var e9= document.getElementById("e9").value;

    var c10= document.getElementById("c10").value;
    // var d10= document.getElementById("d10").value;
    var e10= document.getElementById("e10").value;

    var c11= document.getElementById("c11").value;
    // var d11= document.getElementById("d11").value;
    var e11= document.getElementById("e11").value;

    var c12= document.getElementById("c12").value;
    // var d12= document.getElementById("d12").value;
    var e12= document.getElementById("e12").value;

    sessionStorage.setItem("firstTableInfo", JSON.stringify({
        "c6": c6,
        "e6": e6,
        "d6": people,
        "c7": c7,
        "d7": people,
        "e7": e7,
        "c8": c8,
        "e8": e8,
        "d8": people,
        "c9": c9,
        "d9": people,
        "e9": e9,
        "c10": c10,
        "d10": people,
        "e10": e10,
        "c11": c11,
        "d11": people,
        "e11": e11,
        "c12": c12,
        "d12": people,
        "e12": e12
    }));

}