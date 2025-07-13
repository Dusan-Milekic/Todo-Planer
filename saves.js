function saveToLocalStorage(taskName, taskDate, id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ taskName, taskDate, id });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks.length === 0) {
        let defualtCard = new Card("Insert your task", "😄", 0);
        defualtCard.createCssCard();
    }
    tasks.forEach(task => {
        let newCard = new Card(task.taskName, task.taskDate, task.id);
        addedCardsJS.push(newCard);
        newCard.createCssCard();
    });
    console.log("Tasks loaded from localStorage");
})

function deleteItemFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}