// Alert of sale on load.
let homeBody = document.getElementById("home");
homeBody.onload = function()
{
  // open popup
  popup.style.display = "block";
}

function searchFunction()
{
    // Declare variables
    var input;  // search bar
    var filter; // change text to one case
    var table;  // table values
    var tr;     // table rows
    var td;     // table data
    var i;      // search array
    var text;   // text inputted

    input = document.getElementById("searchBar"); // assign html bar to input

    filter = input.value.toUpperCase(); // change value to uppercase - easier to filter through

    table = document.getElementById("itemTable"); // get table by id

    tr = table.getElementsByTagName("tr"); // get table rows by id - find data
  
    // LOOP TO FIND LETTER/WORD INPUTTED
    for (i = 0; i < tr.length; i++) 
    {
      td = tr[i].getElementsByTagName("td")[0]; // get each table data cell per row

      if (td) 
      {
        text = td.textContent || td.innerText; // if text matches td text

        if (text.toUpperCase().indexOf(filter) > -1)
        {
          tr[i].style.display = ""; // if match, make show 
        } 
        else 
        {
          tr[i].style.display = "none"; // if no match, make disappear
        }
      }
    }
}



// Get popup by id
var popup = document.getElementById("salePopup");

// Get the element that closes popup
var span = document.getElementsByClassName("close")[0];

// When the user clicks x, close popup
span.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks outside of popup, close it
homeBody.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}


function checkForm(){
  if(document.getElementById("nameBox").value === ""){
    alert("Please fill out your name.");
  }
  else if(document.getElementById("emailBox").value === ""){
    alert("Please fill out your email.");
  }
  else if(document.getElementById("detailBox").innerHTML === ""){
    alert("Please fill out the details box.");
  }
  else
  {
    window.open("success.html");
  }
}

// AUDIO VARIABLES
let carHorn = new Audio();
carHorn.src = "assets/audio/carHorn.mp3";

let truckHorn = new Audio();
truckHorn.src = "assets/audio/truckHorn.mp3";

let classicHorn = new Audio();
classicHorn.src = "assets/audio/classicHorn.wav";

let miataHorn = new Audio();
miataHorn.src = "assets/audio/miataHorn.wav";

function changeCar(){
  if(document.getElementById("car").src.indexOf("assets/img/car.png") !== -1){

    document.getElementById("car").src = "assets/img/truck.png";
    truckHorn.play();

  }
  else if(document.getElementById("car").src.indexOf("assets/img/truck.png") !== -1){

    document.getElementById("car").src = "assets/img/classic.png";
    classicHorn.play();
  }
  else if(document.getElementById("car").src.indexOf("assets/img/classic.png") !== -1){
    
    document.getElementById("car").src = "assets/img/miata.png";
    miataHorn.play();
  } 
  else if(document.getElementById("car").src.indexOf("assets/img/miata.png") !== -1){
    
    document.getElementById("car").src = "assets/img/car.png";
    carHorn.play();
  }
}

