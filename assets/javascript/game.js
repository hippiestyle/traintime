
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
    var currentTIme = moment(); 

        
    event.preventDefault(); 
    
    trainName = $("#train-name").val();
    console.log("trainname " + trainName); 
    destination = $("#destination-name").val();
    console.log("destination: " + destination)
    firstTrain = $("#first-train").val(); 
    console.log("first train: "+ firstTrain)
    frequency = $("#frequency").val(); 
    console.log("frequency: " + frequency);


function addRow() { 
    var newRow = $("<tr>"); 
    
    newRow.append($("<td>").text(snapshot.val().ftrainTame)); 
    newRow.append($("<td>").text(snapshot.val().fdestination)); 
    newRow.append($("<td>").text(firstTrain));
    newRow.append($("<td>").text(frequency));
    newRow.append($("<td>").text(snapshot.val().fnextArrival));
    newRow.append($("<td>").text(snapshot.val().fminutesAway));
    
    $(".tableClass").append(newRow); 
}

$("#trainButton").on("click", function() {
    event.preventDefault(); 
    
    trainName = $("#train-name").val();
    console.log("trainname " + trainName); 
    destination = $("#destination-name").val();
    console.log("destination: " + destination)
    firstTrain = $("#first-train").val(); 
    console.log("first train: "+ firstTrain)
    frequency = $("#frequency").val(); 
    console.log("frequency: " + frequency);

    database.ref().set({
        ftrainName: trainName,
        fdestination: destination,
        ffrequency: frequency,
        ffirstTrain: firstTrain,
        fnextArrival: nextArrival,
        fminutesAway: minutesAway,
        fcurrentTime: currentTime
    }); 

    addRow(); 
        console.log("yeah, train button worked")
    });
    
    
});



