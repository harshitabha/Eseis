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
    var textInputValueLowerCase = textInputVal.toLowerCase;

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
        document.getElementById('terminalResultsCont').innerHTML += "<p>" + textToAdd + "</p>";
        scrollToBottomOfResults();
    }

    // get the list of keywords for help and posting it to the screen
    /*************** Change these to the help words for our story ************** */
    var postHelpList = function() {
        var helpKeyWords = [ // ADD HERE
            "- 'Time' will display the current time",
            "- 'Date' will display the current date",
            "* There are more keywords to discover."
        ].join('<br>');
        addTextToResults(helpKeyWords); // stopped at 6:26
    }

    // Getting the time and date and post it depending on what you request
    var getTimeAndDate = function(postTimeDay){
        var timeAndDate = new Date();
        var timeHours = timeAndDate.getHours();
        var timeMinutes = timeAndDate.getMinutes();
        var dateDay = timeAndDate.getDate();
        console.log(dateDay);
        var dateMonth = timeAndDate.getMonth() + 1; // months are counded from 0
        var dateYear = timeAndDate.getFullYear();
        if(timeHours < 10)
        {
            timeHours = "0" + timeHours; // to display a zero before the single digit hour
        }
        if(timeMinutes < 10) {
            timeMinutes = "0" + timeMinutes; // to display a zero before the single digit minute
        }

        var currentTime = timeHours + ":" + timeMinutes;
        var currentDate = dateMonth + "/" + dateMonth + "/" + dateYear; // date is written as it is in the USA

        //positing the right info to the div
        if(postTimeDay == "time")
        {
            addTextToResults(currentTime);
        } else if(postTimeDay == "date") {
            addTextToResults(currentDate);
        }
    }

    //opening links in a new window
    var openLinkInNewWindow = function(linktoOpen) {
        window.open(linktoOpen, +'_blank');
        clearInput();
    }

    // Having a specific text reply to specific strings (we can put our secret responses here)
    var textReplies = function() {
        switch(textInputValueLowerCase) {
            //replies
            case "code":
                clearInput();
                addTextToResults("Get web elements source code at <a target='_blank' href='https://www.webfx.com/web-design/random-color-picker/'");
                break;
            case "founders":
                clearInput();
                addTextToResults("Harshita Bhardwaj and Gerald Kyro Tungol");
                break;
            case "I love you":
            case "love you":
            case "love":
                clearInput();
                addTextToResults("Great this works 💖");
                break;
            
            case "web dev":
            case "web development":
                clearInput();
                addTextToResults("Check out this resource!");
                openLinkInNewWindow("https://www.w3schools.com/");    
                
            case "hello":
            case "hi":
            case "hola":
                clearInput();
                addTextToResults("Hello, I am your assistant... I am based on pure JS.");
                break;

            // replies
            case "youtube":
                clearInput();
                addTextToResults("Type youtube + something to search for.");
                break;

            case "google":
                clearInput();
                addTextToResults("Type google + something to search for.");
                break;

            case "time":
                clearInput();
                getTimeAndDate("time");
                break;

            case "date":
                clearInput();
                getTimeAndDate("time");
                break;

            case "help":
            case "?":
            case "what":
                clearInput();
                postHelpList();
                break;

            default:
                clearInput();
                addTextToResults("<p><i><b>Please wait untill you are prompted to make a choice</b></p>");
                break;
        }
    }

    // Main function to check the entered text and assign it to the correct function
    var checkWord = function() {
        textInputVal = document.getElementById('terminalTextInput').value.trim(); // get the text entered
        textInputValueLowerCase = textInputVal.toLowerCase();

        //only if something was entered
        if(textInputValueLowerCase != "")
        {
            addTextToResults("<p class='userEnteredText'> " + textInputVal + "</p>");
            if(textInputValueLowerCase.substr(0,5) == "open "){ //if the user is asking to open a website
                openLinkInNewWindow('https://' + textInputValueLowerCase.substr(5));
                addTextToResults("<i>The URL " + "<b>" + textInputVal.substr(5) + "</b>" + " should be open </i>");
            }
            else if(textInputValueLowerCase.substr(0,8) == "youtube "){
                openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
                addTextToResults("<i>Youtube has been searched for " + "<b>" + textInputVal.substr(8) + "</b>" + "</i>");
            }
            else if(textInputValueLowerCase.substr(0,7) == "google "){
                openLinkInNewWindow('https://www.google.com/search?query=' + textInputValueLowerCase.substr(7));
                addTextToResults("<i>Google has been searched for " + "<b>" + textInputVal.substr(7) + "</b>" + "</i>");
            }
            else{
                textReplies();
            }
        }
    };


});