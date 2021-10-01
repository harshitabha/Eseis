document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByTagName('form')[0].onsubmit = function(evt) {
        evt.preventDefault(); //prevent the form from submitting
        checkWord(); //check the entered phrase/word/choice
        window.scrollTo(0, 150);
    }

    // get the focus to the text input to enter a word right away
    document.getElementById('terminalTextInput').focus();

    // get the info from the input
    var textInputVal = document.getElementById('terminalTextInput').value.trim();

    // get the text from the results div
    var textResultsValue = document.getElementById('terminalResultsCont').innerHTML;

    // clear the text input
    var clearInput = function() {
        document.getElementById('terminalTextInput').value = '';
    }

    //scroll to the bottom of the results div
    var scrollToBottomOfResults = function (){
        var terminalResultsDiv = document.getElementById('terminalResultsCont');
        terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
    }

    //scroll to the bottom of the results
    scrollToBottomOfResults();

    //add text to the results div
    var addTextToResults = function(textToAdd) {
        document.getElementById('terminalResultsCont').innerHTML += "<p>" + textToAdd + "<p>";
        scrollToBottomOfResults();
    }

    // get the list of keywords for help and posting it to the screen
    /*************** Change these to the help words for our story ************** */
    var postHelpList = function() {
        var helpKeyWords = [ // ADD HERE
            "- c + your code",
            "- 'Time' will display the current time",
            "- 'Date' will display the current date",
            "* There are more keywords to discover."
        ].join('<br>');
        addTextToResults(helpKeyWords); // stopped at 6:26
    }
})