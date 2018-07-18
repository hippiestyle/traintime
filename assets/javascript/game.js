clock();
//import firebase script first 
var trainName = ""; 
var destination = ""; 
var frequency = ""; 
var firstTrain = "";
var nextArrival = ""; 
var minutesAway = ""; 
var timeDifference = ""; 

var jFirstTrain = $("#first-train")
var jTrainName = $("#train-name");
var jDestinationName = $("#destination-name"); 
var jFrequency = $("#frequency");



//Convert first time to moment
var convertedTime = "11:30";
var convertedFormat = "HH:mm"
var convertedDate = moment(convertedTime, convertedFormat);
//three different ways to look at time
var currentTime = moment().format("HH:mm");
var unixTime = moment().unix();
var currentTime = moment().format("dddd, MMMM Do, YYYY h:mm:ss A"); 
//calculate next time
console.log("converted Date: " + convertedDate);
console.log("current time: " + currentTime);
console.log("unix time: " + unixTime);

//initializing firebase 
var config = {
    apiKey: "AIzaSyCTiMd9SCR4-d8pmS3tyDl3tv7rvBIqQ8E",
    authDomain: "traintime-45e32.firebaseapp.com",
    databaseURL: "https://traintime-45e32.firebaseio.com",
    projectId: "traintime-45e32",
    storageBucket: "",
    messagingSenderId: "320423794894"
  };

  firebase.initializeApp(config);

//database reference
var database = firebase.database(); 

// database.ref().on("value", function(snapshot) {
//     var currentTime = currentTime.snapshot.val();
//     $("#currentTime").text(currentTime);

// }); 

database.ref().on("child_added", function(snapshot) {
//creating local variables
    var data = snapshot.val(); 
    var difference = 0; 
    var trainRemainder = 0; 
    var minutesToArrival = ""; 
    var nextTrain = ""; 
    var trainFrequency = snapshot.val().frequency; 
    var currentTime = moment().unix()

    // this is what i need to get to work after I figure out how to properly parse the input data
    difference = moment().diff(moment.unix(data.firstTrain));

    event.preventDefault(); 
    console.log(snapshot.val());

    var newRow = $("<tr>"); 
    
    //train name
    newRow.append($("<td>").text(data.trainName)); 
    //destination
    newRow.append($("<td>").text(data.destination)); 
    //first train
    newRow.append($("<td>").text(data.firstTrain));
    // frequency
    newRow.append($("<td>").text(data.frequency));
    //next arrival
    newRow.append($("<td>").text(moment().unix()));
    // minutes away 
    newRow.append($("<td>").text(data.difference));
    
    $(".tableClass").append(newRow); 

});

function clock() {
    setInterval(function(){
        var upToDateTime = moment().format("dddd, MMMM Do, YYYY h:mm:ss A"); 
        $("#currentTime").text(upToDateTime); 
    }, 1 * 1000);
}


$("#trainButton").on("click", function() {
    event.preventDefault(); 
    trainName = jTrainName.val();
    destination = jDestinationName.val();
    frequency = jFrequency.val() * 60; 
    console.log("frequency in Unix: " + frequency); 
    //need to format this for everything to work properly
    firstTrain = moment(jFirstTrain.val(), "HH:mm").format("X"); 
    console.log("FIRST Train In UNIX: " + firstTrain)
    nextArrival = moment().unix() - (firstTrain - moment().unix()%frequency);
    console.log("Next Arrival: " + nextArrival);
    
    database.ref().push({
        trainName,
        destination,
        frequency,
        firstTrain,
        nextArrival,
        minutesAway
    }); 
    
    console.log("yeah, train button worked")
});

    console.log("TEST: " + moment().format("HH:mm:ss"));
    console.log("TEST: " + moment().seconds(30).valueOf());





 