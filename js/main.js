// JSON = Objects and array nested inside of each other
// JSON = Sending, receiving and storing data
// JSON = Java Script Object Notation

// AJAX = Asynchronous Javascript And XML

// XMLHttpRequest = lets us send and receive data 

var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');

//function to load data on click 
btn.addEventListener("click", function(){
    var ourRequest = new XMLHttpRequest();

    // Get or Post
    // Will go and get data from URL
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    
    ourRequest.onload = function() {
        if(ourRequest.status >= 200 && ourRequest.status < 400){
            //saving all data into a variable
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        }
        //error handling
        else {
            console.log('We connected to the server but it returned an error');
        }
    };

    ourRequest.onerror = function(){
        console.log("Connection error or similar");
    };

    ourRequest.send();
    pageCounter++;
    if(pageCounter > 3){
        btn.classList.add('hide-me');
    }
});

//handlebars.js would be a better way to create HTML out of JSON data
function renderHTML(data){
    var htmlString = "";
    for(var i=0; i<data.length; i++){

        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes ";
        for(j=0; j < data[i].foods.likes.length; j++){
            if(j === 0){
                htmlString += data[i].foods.likes[j];
            }
            else {
                htmlString += " and " + data[i].foods.likes[j];
            }
        } 
        htmlString += ' and dislikes ';
        for(j=0; j < data[i].foods.likes.length; j++){
            if(j === 0){
                htmlString += data[i].foods.dislikes[j];
            }
            else {
                htmlString += " and " + data[i].foods.dislikes[j];
            }
        }
        htmlString += '</p>';
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}