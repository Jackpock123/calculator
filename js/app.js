// Define variable that will take arguements




// Get value using an event listener.

var UI = {};

UI.selectClick = function() {
    [...document.querySelectorAll('.number-input-js')].forEach(function(node) {
        node.addEventListener('click', function() {
            alert('I have been clicked baby!')
            let selectedNumber = node.value;
            console.log(selectedNumber)
        })
    })    
}
UI.selectClick();

// UI.display = function() {
    
// }

// Display current number on display

// Display number in calculation summary window in display


// Flatten out array to do calculation (use a FOR loop to cocatenate everything?)