
//import firebase script first 
var trainName = ""; 
var destination = ""; 
var frequency = ""; 
var firstTrain = "";
var nextArrival = ""; 
var minutesAway = ""; 
var timeDifference = ""; 

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

database.ref().on("value", function(snapshot) {
//creating local variables
    var difference = 0; 
    var trainRemainder = 0; 
    var minutesToArrival = 0; 
    var nextTrain = 0; 
    var trainFrequency = 0; 
    var theTime = 0; 

    //creating difference between current time and now. 
    difference = moment().diff(moment.unix(snapshot.val().ffirstTrain), "minutes");
    //creating remainder of time to help with when the next one is coming
    trainRemainder = difference % frequency; 
    // minutes to arrival shows when the next train is coming based on how often the train comes minus the remainder for the next train
    minutesToArrival = trainFrequency - trainRemainder;  
    //appending the minutes to arrival to right nows time. 
    nextTrain = moment().add(minutesToArrival, "m").format("hh:mm A");
    //showing current time
    currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(theTime);
   //creating the rows which will show the details 

    var newRow = $("<tr>"); 
    
    newRow.append($("<td>").text(snapshot.val().ftrainTame.addClass("data"))); 
    newRow.append($("<td>").text(snapshot.val().fdestination.addClass("data"))); 
    newRow.append($("<td>").text(frequency).addClass("data"));
    newRow.append($("<td>").text(firstTrain).addClass("data"));
    newRow.append($("<td>").text(minutesToArrival).addClass("data"));
    newRow.append($("<td>").text(nextTrain).addClass("data"));
    
    $(".tableClass").append(newRow); 
    
function addTrain() {

    event.preventDefault(); 
    
    trainName = $("#train-name").val();
    destination = $("#destination-name").val();
    firstTrain = $("#first-train").val(); 
    frequency = $("#frequency").val(); 
    console.log(trainName + " " + destination + " " + frequency + " " + firstTrain); 
    
    
    database.ref().push({
        ftrainName: trainName,
        fdestination: destination,
        ffrequency: frequency,
        ffirstTrain: firstTrain,
        fnextArrival: nextArrival,
        fminutesAway: minutesAway,
        fcurrentTime: currentTime
        
    }); 
};
        
    $(".btn").on("click", function() {
        addTrain();

    });

    
});



