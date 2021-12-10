// import {story} from "terminal.js";

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
    // var textInputValueLowerCase = textInputVal.toLowerCase;

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
    var add = function(textToAdd, type = "") {
        if(type=="story") 
        {
            document.getElementById('terminalResultsCont').innerHTML += "<p class='story'>" + textToAdd + "</p>";
            document.getElementsByClassName("story").style.color = "";
        }

        document.getElementById('terminalResultsCont').innerHTML += "<p>" + textToAdd + "</p>";        
        scrollToBottomOfResults();
    }

    // get the list of keywords for help and posting it to the screen
    /*************** Change these to the help words for our story ************** */
    var postHelpList = function() {
        var helpKeyWords = [ // ADD HERE
            "- 'Time' will display the current time",
            "- 'Date' will display the current date",
            "- 'CLEAR' will clear the terminal of all text",
            "* There are more keywords to discover."
        ].join('<br>');
        add(helpKeyWords); // stopped at 6:26
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
            add(currentTime);
        } else if(postTimeDay == "date") {
            add(currentDate);
        }
    }

    //opening links in a new window
    var openLinkInNewWindow = function(linktoOpen) {
        window.open(linktoOpen, +'_blank');
        clearInput();
    }

    // Having a specific text reply to specific strings (we can put our secret responses here)
    var textReplies = function() {
        switch(textInputVal) {
            //replies
            case "code":
                clearInput();
                add("Get web elements source code at <a target='_blank' href='https://www.webfx.com/web-design/random-color-picker/'");
                break;
            case "founders":
                clearInput();
                add("Harshita Bhardwaj and Gerald Kyro Tungol");
                break;
            
            case "web dev":
            case "web development":
                clearInput();
                add("Check out this resource!");
                openLinkInNewWindow("https://www.w3schools.com/");    
                
            case "hello":
            case "hi":
            case "hola":
                clearInput();
                add("Hello, I am your assistant... I am based on pure JS.");
                break;

            // replies
            case "youtube":
                clearInput();
                add("Type youtube + something to search for.");
                break;

            case "google":
                clearInput();
                add("Type google + something to search for.");
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

            // case "CLEAR":
            //     clearInput();
            //     add("worked)");
            //     break;
            
            case "CLEAR":
                clearInput();
                add("WARNING! This is a permanant action and can't be undone. Do you wish to continue? y/n");
                textInputVal = document.getElementById('terminalTextInput').value.trim(); // get the text entered
                clearTerminal();
                break;

            case "START":
                clearInput();
                add("Your adventure will begin now");
                story();
                //need to make it so this can only happen once
                break;

            default:
                clearInput();
                add("<p><i><b>Please wait untill you are prompted to make a choice</b></p>");
                break;
        }
    }

    // Main function to check the entered text and assign it to the correct function
    var checkWord = function() {
        textInputVal = document.getElementById('terminalTextInput').value.trim(); // get the text entered
        // textInputValueLowerCase = textInputVal.toLowerCase();

        //only if something was entered
        if(textInputVal != "")
        {
            add("<p class='userEnteredText'> " + textInputVal + "</p>");
            if(textInputVal.substr(0,5) == "open "){ //if the user is asking to open a website
                openLinkInNewWindow('https://' + textInputVal.substr(5));
                add("<i>The URL " + "<b>" + textInputVal.substr(5) + "</b>" + " should be open </i>");
            }
            else if(textInputVal.substr(0,8) == "youtube "){
                openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputVal.substr(8));
                add("<i>Youtube has been searched for " + "<b>" + textInputVal.substr(8) + "</b>" + "</i>");
            }
            else if(textInputVal.substr(0,7) == "google "){
                openLinkInNewWindow('https://www.google.com/search?query=' + textInputVal.substr(7));
                add("<i>Google has been searched for " + "<b>" + textInputVal.substr(7) + "</b>" + "</i>");
            }
            else{
                textReplies();
            }
        }
    };

    // will clear the terminal div of all text CAN'T BE UNDONE
    var clearTerminal = () => document.getElementById("terminalResultsCont").innerHTML = "";

    var story = function()
    {
        var choicea = false;
        var choiceb = false;
        function reset(){
            choicea = false;
            choiceb = false;
        }
        var c = false
        add("Vesper lies in bed awake, listening to the sounds outside the house. They quickly get up once more for the eighth time,\
            to peer through the square crack on the wall. The sun had yet to dawn, but through the lightened sky Vesper saw a figure,\
            accompanied by two other people, walking slowly toward the house.", "story"); //Intro
        if(choicea) //stay back
        {
            add("Waiting cautiously in the room, a couple thoughts pass Vesper’s head. Who were those people? Were they enemies? \
            They didn\’t look armed. Maybe they were invaders. But then the villagers would have sounded the alarm. Maybe they were taken out?\
            Or maybe they just weren\’t awake yet? No they would\’ve been awake. As time passed, Vesper did not hear much movement after the door\
            had been knocked on. The last thought had passed them. What if father had come back? When that thought hit them");//A
            if(choicea) //stay back again
            {
                add("Vesper stays back and waits. It shouldn\’t be father, he’s been out for 3 weeks already. He would have sent a notice back. And thus, Vesper proceeded\
                along with the rest of the day, refusing to go outside in case of danger. Near the evening Vesper heard a knock on the front door. Opening it they discovered\
                two villagers asking if Vesper could join the funeral they were going to hold tomorrow.");//AA
                if(choicea) //for who?
                {
                    add("\“For who?\” Vesper asks. The other villagers\' expressions changed considerably, first from disbelief, to questioning, and finally cold. \“Ah. I see. Sorry to\
                        bother you.\” said the further villager as they turned to walk away. And so Vesper lived their whole life indoors only coming outside occasionally to buy food. After\
                        a while they found out that their father had died, spending time to atone for their own self pity. \nWorld End. Restart?");//AAA
                }
                else if(choiceb) //No.
                {
                    add("\“No…\” Said Vesper.\
                    The villagers\’ expressions changed. The furthest villager started to say \“Should have known you were a coldhearted bastard\” \
                    And with the villagers turned and left. Vesper stood in confusion and wonder. A bit later, they overheard conversation from the village.\
                    \¨Did you hear? The sir in the village died outside\¨ After hearing that the young Vesper broke down in tears. \¨He even died in front of the house\
                    but his child did not open the door.\¨ Vesper cried even harder.\nA month later Vesper stood behind the front door.");//AAB
                    if(choicea) //Open the door.
                    {
                        add("Vesper proceeded to reach for the handle… and open the door once more. The day after their father\’s death, Vesper had gone to the funeral to apologize\
                        to the whole village, especially their dead father. Following that they paid their due respect and went back home to recover. Some villagers left some consolation gifts at the door, which\
                        were mostly food, but showed their support for the now truly lonely Vesper. The villagers welcomed Vesper as they left the house, sparking a warm and friendly\
                        environment.\n The peaceful ending.\n World End. Restart?");//AABA
                    }
                    else if(choiceb) //Wait.
                    {
                        add("Vesper proceeded to reach for the handle… but hesitated. Maybe it was that hesitation that broke down their courage and \
                        prevented them from going out for the following three weeks. Vesper continued to live alone until their food supply was close to gone. \
                        They had to make a choice.");//AABB
                        if(choicea)//Leave the Village
                        {
                            add("Vesper decides to leave the village. The front door of the house was finally opened… but the house was empty.\
                            Vesper had left the village secretly in the nighttime so that no one could spot them. The villagers decided to leave the\
                            house as to avoid conflict in case Vesper came back in the future. Which they later did but that’s another story.\nWorld End. Restart?");//AABBA
                        }
                        else if(choiceb)//Explore the house
                        {
                            add("Vesper decides to explore the house, specifically the rooms of his father. The goal, well either food or money to pay for food. \
                            First Vesper went through their father\’s room. There was a few pieces of jewelry as well as a bit of cash which they quickly pocketed. \
                            Then Vesper headed towards the office. Here there were drawers, cabinets, and boxes that might contain things. Vesper\’s eyes locked onto a \
                            strange box on a shelf. Taking it out and opening it, Vesper changed from curiosity to shock… Then to sadness. Until now, Vesper realized that \
                            they\’ve never paid respects to their late father at all. However, their mother was still alive. Vesper made up their mind to go out and \
                            adventure the world.\nLeaving in good heart!\n World End. Restart?");//AABBB
                        }
                    }
                }
            else if(choiceb)//Rush to the door
            {
                add("Vesper ran to the door as fast as they could. When the door opened, they were instantly filled with despair and most importantly,\
                regret. Vesper’s father was kneeling in front of the door. A rhythmic dripping sound could be heard and villagers could be seen gathering\
                around the house. Vesper looked at the kneeling figure who struggled to open his eyes. Vesper watched in horror while some villagers looked\
                away sadly and continued and others helped carry Vesper’s father away. In their regret Vesper wallowed in self-hate,\
                eventually dying three days later.\n World End. Restart?");//AB
            }
            }
            else if(choiceb)//Run to the Door
            {  
                add("Vesper ran to the door as fast as they could. When the door opened, they were instantly filled with despair. \
                Vesper’s father was kneeling in front of the door. A rhythmic dripping sound could be heard and villagers could be seen \
                gathering around the house. Vesper looked at the kneeling figure who struggled to open his eyes. Watching in horror, Vesper saw \
                their father hold three fingers in his hand before going limp. Some villagers looked away sadly and continued while others\
                helped carry Vesper’s father away.");//B
                if(choicea)//
                {
                    add("Spirit +2.\
                    Vesper\’s blood became cold and chilly when they noticed disapproving looks in the villagers\’ eyes.\
                    I… let my father die. It was all me. Rage started to build in Vesper and soon they found themselves\
                    running into their room in a mad rage. Soon they regained consciousness… \
                    ");//BA
                    if(choicea)//
                    {
                        add("In the forest. There lay a bunch of broken trees, branches, and scattered leaves everywhere. \
                        The ground also had many holes in it and adrenaline seemed to pump through their body. Confused at the \
                        situation, Vesper decides to…\
                        ");//BAA
                        if(choicea)//
                        {
                            add("Vesper thinks about what happened. In the rage, they had seemingly jumped up through the house,\
                            making a hole to the roof but… that didn\’t seem possible. They then fell back to the ground, hitting trees\
                            along the way. Suddenly the sound of rustling appeared and villagers surrounded them. They appeared to be\
                            smaller than usual. However, they soon sent Vesper howling in pain as pikes and swords poked through their\
                            skin. \“AARGHH!\” The villagers, seemingly scared by the scream, still continued to hack away at Vesper, until\
                            they lay on the ground. A voice seemed to say, \“too bad, you weren\’t that interesting after allll...\”\
                            World End. Restart?\
                            ");//BAAA END
                        }
                        else if(choiceb)//
                        {
                            add("Vesper looks for where they might’ve come from. They decided to follow the direction of the broken \
                            branches from where they woke up. However, whispers were soon heard, and Vesper could, somehow, hear them very\
                            clearly. “The monster is on the move! What’s next?” “Follow for now. Wait till the others come.” \
                            ");//BAAB
                            if(choicea)//
                            {
                                add("Vesper walks up to them to ask what the monster is and where. However, when they approached,\
                                the villagers ran away screaming. \“It’s over there!\” Vesper hears some voices say. An arrow whistles \
                                past the trees and pierces their eye. AHHH IT HURTS. Vesper yells out a roar of pain. The villagers \
                                suddenly appeared from the forest, fashioned with an assortment of weapons. In a rage, Vesper swings their…\
                                claws? Vesper froze in shock as a huge furry claw forced its way through the crowd, sending them flying \
                                back through the trees. \“What?\” The other villagers seeing the opportunity, send him into the darkness with\
                                another attack. Broken from the shock, Vesper started using his newfound strength to blindly lash out at the\
                                villagers until pure silence ensued. Thus Vesper wandered as a blind creature until they hungered and died.\
                                ");//BAABA End
                            }
                            else if(choiceb)//
                            {
                                add(" Vesper continues heading back and soon sees the village. However, a line of villagers\
                                was facing their direction along with weapons of all sorts. They seemed cautious and fearful.\
                                Vesper in confusion checks themself and is shocked. In their shock, they realize that they were\
                                the cause of the fear and the weapons. Vesper realized something and turned longingly and with\
                                melancholy towards the village. Without a word, they then left. Vesper was thus left to wander\
                                the forest and grow accustomed to their new form. They had transformed into a werewolf. Vesper \
                                did have an encounter with another being, leading to another series of difficult choices, but that\
                                is for another story.\
                                    World End. Restart?\
                                ");//BAABB End
                            }
                        }
                    }
                    else if(choiceb)//
                    {
                        add("In the room. The room looked like a hurricane. Objects lay everywhere, the bed was overturned, and\
                        holes were punched in everywhere on the floor and walls. Huge cracks in the walls made the room seem to collapse. \
                        There seemed to be a blood trail leading out the window. There was also a glint of light from a hole in the wall.\
                        ");//BAB
                        if(choicea)//
                        {
                            add("Carefully heading past the window shards, Vesper heads into the forest following the trail. The forest \
                            reeked of silence but Vesper was too focused on the blood trail to notice. Vesper found it harder and harder to \
                            see the blood trail until they reached the end.  A chilling voice whispered in their ear.\
                            ");//BABA
                            if(choicea)//
                            {
                                add("\“Who are you?\”  Vesper asks. \
                                \“Only who you think I am. You however are a being so full of hatred. Surprisingly for yourself. How interesting.\”\
                                \“Show yourself! Let me see who you are\”\
                                \“So concerned with others, aren’t you? You should be more aware of your own self. Who you are and, whatt… you are.\”\
                                You quickly scan the surrounding area. Although a voice was heard, nothing seemed to have changed.\
                                ");//BABAA
                                if(choicea)//
                                {
                                    add("You run back towards the village. The eerie voice behind you fades away with one last message, \“\
                                    Up to you then.\” As you near the house you realize that the blood trail was gone and that the windows \
                                    were magically repaired. Stopping at the front you see a crowd gathered at the door. Villagers were clearly \
                                    angry, throwing all sorts of objects at the house. And Vesper, in your angle, was visibly trembling through \
                                    the window. \
                                    Your eyes meet\
                                    A light sparks\
                                    then you are run over by the angry mob.\
                                    World End. Restart?\
                                    ");//BABAAA End
                                }
                                else if(choiceb)//
                                {
                                    add("“What do you want from me?” \
                                    \“To help you turn that hate into strength\”\
                                    After saying that, the forest space in front of me started to twist, pouring into the surroundings...\
                                    The world, or at least your world, had been driven to pure darkness.\
                                    In the darkness, you see a blinking light.\
                                    World End. Restart?\
                                    ");//BABAAB End
                                }
                            }
                            else if(choiceb)//
                            {
                                add("Vesper breaks off into a mad dash. \“Come! Give mama a hug!\” The voice said, increasingly louder than before. In fear \
                                and panic, Vesper had run straight toward the voice. They felt lightheaded and the world seemed to break off from reality. \“\
                                Poor fellow, running through dimensions, you’re bound to be shredded.\” Soon the world was silent.\
                                World End. Restart?\
                                ");//BABAB
                            }
                        }
                        else if(choiceb)//
                        {
                            add("Peering through the hole, Vesper saw that in the other room, somewhat displaced, a broken box lay at the center. They \
                            ran out of the room and in front of the door to the room next to it. It was their father\’s office room. Vesper felt a sad \
                            nostalgia as they entered the room. Vesper looked at the box in the middle. There was a note on it. It read, \“I am dead… I know. \
                            Sorry for leaving you alone. I was very happy raising you, you meant more to me than this world. You must be angry at the world \
                            or at me for leaving you. There may not be anything I can say to relieve that. I would only wish that you someday are able to let \
                            this become your strength.  \nIf everything has happened as predicted, then there is nothing holding you back. You can choose to stay \
                            here if you wish, or you can choose to go into the world and find your purpose. And finally, know that you are never alone, for your \
                            mother is still somewhere in this world, and that I am with you in spirit. Signed, Caland Milcloud\”");//BABB
                            if(choicea)//
                            {
                                add("Vesper, not wanting to relent to sadness, crushes the paper in their hand before throwing it to the ground \
                                and stepping on it. It was if suddenly, they had a place to vent their anger and guilt. “Damn right I’m mad! Where \
                                the hell did you go!” Five minutes later… “You godda-” Ten minutes later. Vesper tired of the anger and ranting, fell \
                                to the ground tired. And so they lived in anger and isolation, and the world would be better just like that.\
                                World End. Restart?\
                                ");//BABBA End
                            }
                            else if(choiceb)//
                            {
                                add("Carefully folding the letter, Vesper holds the paper over a candle, letting it burn. Sorry father, \
                                for not being there when you died. The anger and guilt in them left, leaving and enhancing only the sadness \
                                and melancholy. With this, Vesper chose to stay in the village, living peacefully until the day they died. \
                                World End. Restart?\
                            ");//BABBB End
                            }
                        }
                    }
                }
                else if(choiceb)
                {
                    add("Vesper turned around not sparing any emotions and reorganizing their thoughts. It didn\’t happen. \
                    It didn\’t happen... What happened? And thus, Vesper proceeded along with the rest of the day, refusing to go \
                    outside. Near the evening Vesper heard a knock on the front door. Opening it they discovered two villagers asking \
                    if Vesper could join the funeral they were going to hold tomorrow. ");//BB
                    if(choicea)//
                    {
                        add("\“For who?\” Vesper asks. The other villagers\' expressions changed considerably, first \
                        from disbelief, to questioning, and finally cold. \“Ah. I see. Sorry to bother you.\” said the\
                            further villager as they turned to walk away. And so Vesper lived their whole life indoors only \
                            coming outside occasionally to buy food. After a decade passed Vesper found a box with a note inside \
                            it but that’s another time. \
                        World End. Restart?\
                        ");//BBA End
                    }
                    else if(choiceb)//
                    {
                        add("\“No…\” Said Vesper.\
                        The villagers\’ expressions changed. The furthest villager started to say \“Should have known you were a col-\” \
                        \“Leave.\” and with that Vesper slams the door closed. They then walked to their father\’s office to reminisce on the past.\
                            Ah right that\’s the word, isn\’t it? Reminisce… And with that Vesper dropped to their knees, tears welling out uncontrollably,\
                            and released the saddest sob one could ever hear…\
                        A month later Vesper stood behind the front door.\
                        ");//BBB
                        if(choicea)//
                        {
                            add("Vesper proceeded to reach for the handle… and open the door once more. The day after their \
                            father\’s death, Vesper had gone to the funeral to apologize to the whole village. Following that they \
                            paid their due respect and went back home to recover. Some villagers left some consolation gifts at the \
                            door, which were mostly food, but showed their support for the now truly lonely Vesper. The villagers\
                                welcomed Vesper as they left the house, sparking a warm and friendly environment. \
                            ");//BBBA End
                        }
                        else if(choiceb)//
                        {
                            add("Vesper proceeded to reach for the handle… but hesitated. Maybe it was that hesitation that\
                                broke down their courage and prevented them from going out for the following three weeks. Vesper continued \
                                to live alone until their food supply was close to gone. They had to make a choice.");//BBBB
                            if(choicea)//
                            {
                                add("Vesper decides to leave the village. The front door of the house was finally opened… \
                                but the house was empty. Vesper had left the village secretly in the nighttime so that no one could\
                                    spot them. The villagers decided to leave the house as it was to avoid conflict, just in case Vesper\
                                    came back in the future. Which they later did but that’s another story.\
                                World End. Restart?\
                                ");//BBBBA End
                            }
                            else if(choiceb)//
                            {
                                add("Vesper decides to explore the house, specifically the rooms of his father. The goal, well either food \
                                or money to pay for food. First Vesper went through their father’s room. There was a few pieces of jewelry as well \
                                as a bit of cash which they quickly pocketed. Then Vesper headed towards the office. Here there were drawers, cabinets, \
                                and boxes that might contain things. Vesper’s eyes locked onto a strange box on a shelf. Taking it out and opening it,\
                                    Vesper changed from curiosity to shock… Then to sadness. Until now, Vesper realized that they’ve never paid respects to\
                                    their late father at all. And here they were, searching for any wealth he could’ve possible left behind. Vesper would \
                                    never notice the crystals in the box, because they proceeded to hang themselves that very day. \
                                World End. Restart?\
                                ");//BBBBB End
                            }
                        }
                    }
                }
            }
        }
    };


});
