clock();

    $("#first-train").mask("00:00");
    $("#frequency").mask("000");

  

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



    event.preventDefault(); 


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
        //create a variable with the most up to date time, every second that goes by, update# current time
        var upToDateTime = moment().format("dddd, MMMM Do, YYYY h:mm:ss A"); 
        $("#currentTime").text(upToDateTime); 
    }, 1000);
}

$("#trainButton").on("click", function() {

    //initialize variable to make calling jquery easier         
    var jFirstTrain = $("#first-train");
    var jTrainName = $("#train-name");
    var jDestinationName = $("#destination-name"); 
    var jFrequency = $("#frequency");


    event.preventDefault(); 
    //add the trainName to variable from the input form 
    trainName = jTrainName.val().trim();
    //add destination to variable from input form
    destination = jDestinationName.val().trim();
    //add frequency to variable from input form 
    frequency = jFrequency.val().trim();
    //add first train time to variable from input form 
    firstTrain = jFirstTrain.val().trim(); 

    console.log("FIRST Train In UNIX: " + firstTrain)

    
    database.ref().push({
        //push those variables to firebase 
        trainName,
        destination,
        frequency,
        firstTrain
    }); 

});


 