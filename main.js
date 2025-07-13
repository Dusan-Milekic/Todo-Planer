let addTaskButton = document.getElementById("add");
let removeTaskButton = document.getElementById("remove");
let completeTaskButton = document.getElementById("complete");

let mySound = new Audio('assets/answer-correct.mp3'); // Path to your sound file
let popSound = new Audio('assets/pop.mp3'); // Path to your sound file
let deleteSound = new Audio('assets/error.mp3'); // Path to your sound file
let uncompleteSound = new Audio('assets/gtasa.mp3'); // Path to your sound file

order = 1;


let addedCardsJS = [];
let addedCards;

addTaskButton.addEventListener("click", function() {
    event.preventDefault();
    let default_card = document.getElementById("defualt-card");
    if (default_card !==null)
        default_card.remove();

    let taskName = document.getElementById("task-input").value;
    let taskDate = document.getElementById("deadline-input").value;
    if (taskName != "" && taskDate !== "") {
        let newCard = new Card(taskName, taskDate, order);
        addedCardsJS.push(newCard);
        newCard.createCssCard()
        saveToLocalStorage(taskName, taskDate, order);
        order++;
    }
    else{
        alert("Please fill in both fields.");
    }

    popSound.play(); 

    addedCards = document.querySelectorAll(".card");
});

removeTaskButton.addEventListener("click", function() {
    event.preventDefault();
    let allCards = document.querySelectorAll(".card");
    for (let i = 0; i < addedCardsJS.length; i++) {
        if (addedCardsJS[i].changed === true) {
            allCards[i].remove();
            deleteItemFromLocalStorage(addedCardsJS[i].id);
            deleteSound.play(); // Play sound when task is removed
        }
    }
});


completeTaskButton.addEventListener("click", function() {
    event.preventDefault();
    let allCards = document.querySelectorAll(".card");
    for (let i = 0; i < addedCardsJS.length; i++) {
        console.log(allCards[i].style.textDecoration);
        if (addedCardsJS[i].changed === true && allCards[i].style.textDecoration !== "line-through 4px") {
        
            allCards[i].style.textDecoration = "line-through"; // Strikethrough effect
            allCards[i].style.textDecorationThickness =  "4px";
            
            allCards[i].style.backgroundColor = "white"; // Reset background color
            allCards[i].querySelector("h2").style.color = "#212121"; // Reset text color
            allCards[i].style.outlineColor = "#212121"; // Reset outline color
            mySound.play(); // Play sound when task is completed
            addedCardsJS[i].changed = false; // Reset the changed state
        }
        else if (addedCardsJS[i].changed === true && allCards[i].style.textDecoration === "line-through 4px") {
            allCards[i].style.textDecoration = "none"; // Remove strikethrough effect
            allCards[i].style.textDecorationThickness =  "0px";
            allCards[i].style.backgroundColor = "white"; // Reset background color
            allCards[i].querySelector("h2").style.color = "#212121"; // Reset text color
            allCards[i].style.outlineColor = "#212121"; // Reset outline color
            addedCardsJS[i].changed = false; // Reset the changed state
            uncompleteSound.play(); // Play sound when task is uncompleted
        }
    }
});