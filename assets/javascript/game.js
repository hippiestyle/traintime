
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

database.ref().on("child_added", function(snapshot) {
//creating local variables
    var data = snapshot.val(); 
    var difference = 0; 
    var trainRemainder = 0; 
    var minutesToArrival = 0; 
    var nextTrain = 0; 
    var trainFrequency = 0; 
    var theTime = 0; 
    var currentTime = moment(); 
 //Convert first time to moment
    var convertedTime = "01/01/1999"
    var convertedLook = "HH:mm"
 //calculate next time
    
    

    event.preventDefault(); 
    console.log(snapshot.val());

    var newRow = $("<tr>"); 
    
    newRow.append($("<td>").text(data.trainName)); 
    newRow.append($("<td>").text(data.destination)); 
    newRow.append($("<td>").text(data.firstTrain));
    newRow.append($("<td>").text(data.frequency));
    newRow.append($("<td>").text(data.nextArrival));
    newRow.append($("<td>").text(data.minutesAway));
    
    $(".tableClass").append(newRow); 

}); 


$("#trainButton").on("click", function() {
    event.preventDefault(); 
    console.log("clicked");
    trainName = $("#train-name").val();
    console.log("trainname " + trainName); 
    destination = $("#destination-name").val();
    console.log("destination: " + destination)
    firstTrain = $("#first-train").val(); 
    console.log("first train: "+ firstTrain)
    frequency = $("#frequency").val(); 
    console.log("frequency: " + frequency);

    database.ref().push({
        trainName,
        destination,
        frequency,
        firstTrain,
        nextArrival,
        minutesAway,
        currentTime
    }); 

    console.log("yeah, train button worked")
});







 