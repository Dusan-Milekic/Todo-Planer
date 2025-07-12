let addTaskButton = document.getElementById("add");
let removeTaskButton = document.getElementById("remove");
order = 1;


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
        newCard.createCssCard()
        saveToLocalStorage(taskName, taskDate, order);
        order++;
    }
    else{
        alert("Please fill in both fields.");
    }

    addedCards = document.querySelectorAll(".card");
});

