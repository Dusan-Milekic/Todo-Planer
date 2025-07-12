let addTaskButton = document.getElementById("add");
let removeTaskButton = document.getElementById("remove");
order = 1;
let allAddedCards = [];
addTaskButton.addEventListener("click", function() {
    event.preventDefault();
    let taskName = document.getElementById("task-input").value;
    let taskDate = document.getElementById("deadline-input").value;
    if (taskName != "" && taskDate !== "") {
        let newCard = new Card(taskName, taskDate, order);
        allAddedCards.push(newCard.createCssCard());
        alert( " has been added to your tasks.");
        order++;
    }
    else{
        alert("Please fill in both fields.");
    }
});
