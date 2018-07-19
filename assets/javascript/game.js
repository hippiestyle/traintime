

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
clock();
// var trainName = ""; 
// var destination = ""; 
// var frequency = ""; 
// var firstTrain = "";
// var nextArrival = ""; 
// var minutesAway = ""; 
// var timeDifference = ""; 




database.ref().on("child_added", function(snapshot) {
//creating local variables
    var data = snapshot.val(); 

    //grab variable from Firebase
    var trainFrequency = snapshot.val().frequency; 
    //format firstrain input into a military time
    var firstTrain = moment(data.firstTrain, "HH:mm");
    //format firsttrain time minus 1 year (for calculation purposes)
    var firstTrainFormatted = moment(firstTrain).subtract(1, "years");
    //calculating the difference between now and the first train. 
    var timeDifference = moment().diff(firstTrainFormatted, "minutes"); 
    // calculating the remainder of time since the last train
    var timeElapsed = timeDifference % trainFrequency;
    //calculating minutes to arrival by train frequency minus timeElapsed
    var minutesToArrival = trainFrequency - timeElapsed; 
    //calculating when the next trsain comes by adding minutes to arrival from current time and formatting to military time. 
    var nextTrain = moment().add(minutesToArrival, "minutes").format("HH:mm"); 
    console.log("time difference: " + timeDifference);
    console.log("first train formatted: " + firstTrainFormatted);
    console.log("first train: " + firstTrain);
    console.log("data.firstTrain: " + data.firstTrain); 
    console.log("next Train Interval: " + timeElapsed);
    console.log("minutes to Arrival: " + minutesToArrival); 
    console.log("next Train: " + nextTrain); 
    // this is what i need to get to work after I figure out how to properly parse the input data
    //difference = moment().diff(moment.unix(data.firstTrain));


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
    newRow.append($("<td>").text(nextTrain));
    // minutes away 
    newRow.append($("<td>").text(minutesToArrival));
    
    $(".tableClass").append(newRow); 

});

function clock() {
    setInterval(function(){
        var upToDateTime = moment().format("dddd, MMMM Do, YYYY h:mm:ss A"); 
        $("#currentTime").text(upToDateTime); 
    }, 1 * 1000);
}



$("#trainButton").on("click", function() {

    var jFirstTrain = $("#first-train");
    var jTrainName = $("#train-name");
    var jDestinationName = $("#destination-name"); 
    var jFrequency = $("#frequency");

    event.preventDefault(); 
    trainName = jTrainName.val();
    destination = jDestinationName.val();
    frequency = jFrequency.val();
    firstTrain = jFirstTrain.val(); 
    console.log("FIRST Train In UNIX: " + firstTrain)

    
    database.ref().push({
        trainName,
        destination,
        frequency,
        firstTrain
    }); 
    
    console.log("yeah, train button worked")
});

    console.log("TEST: " + moment().format("HH:mm:ss"));
    console.log("TEST: " + moment().seconds(30).valueOf());





 