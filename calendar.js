class Card {
            constructor(name, date, id, calendarDate = null) {
                this.name = name;
                this.date = date;
                this.id = id;
                this.changed = false;
                this.calendarDate = calendarDate; // Format: "YYYY-MM-DD"
            }   
            
            createCssCard(){
                let root = document.getElementById("gridHolder");
                const card = document.createElement("div");
                card.classList.add("card");
                let h2 = document.createElement("h2");
                h2.textContent = this.name;
                let p = document.createElement("p");
                p.textContent = this.date;
                
                // Add calendar date info
                if (this.calendarDate) {
                    let dateP = document.createElement("p");
                    dateP.textContent = `📅 ${formatDateForDisplay(this.calendarDate)}`;
                    dateP.style.fontSize = "0.9em";
                    dateP.style.color = "#448AFF";
                    card.appendChild(h2);
                    card.appendChild(p);
                    card.appendChild(dateP);
                } else {
                    card.appendChild(h2);
                    card.appendChild(p);
                }
                
                root.appendChild(card);

                card.addEventListener("click", () => {
                    if (this.changed === true){
                        card.style.backgroundColor = "white";
                        h2.style.color = "#212121";
                        card.style.borderColor = "#212121";
                        this.changed = false;
                    } else {
                        card.style.backgroundColor = "#212121";
                        h2.style.color = "white";
                        card.style.borderColor = "white";
                        this.changed = true;
                    }
                });
            }
        }

        // Calendar functionality with task integration
        let displayMonth = new Date().getMonth();
        let displayYear = new Date().getFullYear();
        let selectedDate = null;
        let selectedDateString = null;

        const monthNames = [
            'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
            'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
        ];

        // Task management variables
        let order = 1;
        let addedCardsJS = [];
        let tasksVisible = false;

        function daysInMonth(month, year) {
            const daysInMonths = [
                31,
                (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
                31, 30, 31, 30, 31, 31, 30, 31, 30, 31
            ];
            return daysInMonths[month];
        }

        function getFirstDayOfMonth(month, year) {
            const firstDay = new Date(year, month, 1);
            return firstDay.getDay();
        }

        function updateMonthHeader() {
            document.getElementById('currentMonth').textContent = 
                `${monthNames[displayMonth]} ${displayYear}`;
        }

        function formatDateString(day, month, year) {
            return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }

        function formatDateForDisplay(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${day}.${month}.${year}`;
        }

        function getTasksForDate(dateString) {
            let tasks = JSON.parse(localStorage.getItem("calendarTasks")) || {};
            return tasks[dateString] || [];
        }

        function hasTasksOnDate(dateString) {
            let tasks = getTasksForDate(dateString);
            return tasks.length > 0;
        }

        function LoadDays() {
            let currentDate = new Date();
            let today = currentDate.getDate();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            
            let daysMax = daysInMonth(displayMonth, displayYear);
            let firstDayOfWeek = getFirstDayOfMonth(displayMonth, displayYear);
            
            let prevMonth = displayMonth === 0 ? 11 : displayMonth - 1;
            let prevYear = displayMonth === 0 ? displayYear - 1 : displayYear;
            let prevMonthDays = daysInMonth(prevMonth, prevYear);
            
            let rows = [
                document.getElementById('N1'),
                document.getElementById('N2'),
                document.getElementById('N3'),
                document.getElementById('N4'),
                document.getElementById('N5'),
                document.getElementById('N6')
            ];
            
            rows.forEach(row => {
                if (row) row.innerHTML = '';
            });
            
            let dayCounter = 1;
            let nextMonthDayCounter = 1;
            
            for (let week = 0; week < 6; week++) {
                for (let day = 0; day < 7; day++) {
                    let cardElement = document.createElement("div");
                    let isCurrentMonth = true;
                    let isToday = false;
                    let dayNumber;
                    let dateString;
                    
                    if (week === 0 && day < firstDayOfWeek) {
                        dayNumber = prevMonthDays - firstDayOfWeek + day + 1;
                        isCurrentMonth = false;
                        dateString = formatDateString(dayNumber, prevMonth, prevYear);
                        cardElement.classList.add('calendar-card', 'text-muted', 'bg-secondary', 'col', 'p-0', 'rounded-0');
                    } else if (dayCounter <= daysMax) {
                        dayNumber = dayCounter;
                        isToday = dayCounter === today && 
                                 displayMonth === currentMonth && 
                                 displayYear === currentYear;
                        dateString = formatDateString(dayNumber, displayMonth, displayYear);
                        
                        if (isToday) {
                            cardElement.classList.add('calendar-card', 'text-white', 'bg-primary', 'col', 'p-0', 'rounded-0');
                        } else {
                            cardElement.classList.add('calendar-card', 'text-white', 'bg-dark', 'col', 'p-0', 'rounded-0');
                        }
                        dayCounter++;
                    } else {
                        dayNumber = nextMonthDayCounter;
                        isCurrentMonth = false;
                        let nextMonth = displayMonth === 11 ? 0 : displayMonth + 1;
                        let nextYear = displayMonth === 11 ? displayYear + 1 : displayYear;
                        dateString = formatDateString(dayNumber, nextMonth, nextYear);
                        cardElement.classList.add('calendar-card', 'text-muted', 'bg-secondary', 'col', 'p-0', 'rounded-0');
                        nextMonthDayCounter++;
                    }
                    
                    // Check if this date has tasks
                    if (hasTasksOnDate(dateString)) {
                        cardElement.classList.add('has-tasks');
                    }
                    
                    let bodyElement = document.createElement("div");
                    bodyElement.classList.add('card-body', 'p-1', 'p-sm-3');
                    
                    let titleElement = document.createElement("h4");
                    titleElement.classList.add('card-title', 'm-0');
                    titleElement.innerText = dayNumber;
                    
                    bodyElement.appendChild(titleElement);
                    cardElement.appendChild(bodyElement);
                    
                    // Add click event for date selection
                    cardElement.addEventListener('click', function() {
                        selectCalendarDate(dayNumber, isCurrentMonth, dateString, cardElement);
                    });
                    
                    if (rows[week]) {
                        rows[week].appendChild(cardElement);
                    }
                }
            }
            
            updateMonthHeader();
            updateTasksDisplay();
        }

        function selectCalendarDate(day, isCurrentMonth, dateString, cardElement) {
            if (isCurrentMonth) {
                // Remove previous selection
                document.querySelectorAll('.calendar-card.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selection to clicked card
                cardElement.classList.add('selected');
                
                selectedDate = day;
                selectedDateString = dateString;
                
                // Update selected date info
                document.getElementById('selectedDateInfo').textContent = 
                    `Izabran datum: ${formatDateForDisplay(dateString)}`;
                
                updateTasksDisplay();
            }
        }

        function changeMonth(direction) {
            displayMonth += direction;
            
            if (displayMonth > 11) {
                displayMonth = 0;
                displayYear++;
            } else if (displayMonth < 0) {
                displayMonth = 11;
                displayYear--;
            }
            
            LoadDays();
        }

        function toggleTasks() {
            const tasksSection = document.getElementById('tasksSection');
            const toggleText = document.getElementById('toggleText');
            
            tasksVisible = !tasksVisible;
            
            if (tasksVisible) {
                tasksSection.classList.add('show');
                toggleText.textContent = 'Sakrij Zadatke';
            } else {
                tasksSection.classList.remove('show');
                toggleText.textContent = 'Prikaži Zadatke';
            }
        }

        function updateTasksDisplay() {
            const gridHolder = document.getElementById('gridHolder');
            gridHolder.innerHTML = '';
            addedCardsJS = [];
            
            if (selectedDateString) {
                let tasks = getTasksForDate(selectedDateString);
                if (tasks.length === 0) {
                    let defaultCard = new Card("Nema zadataka za ovaj dan", "😊", 0, selectedDateString);
                    defaultCard.createCssCard();
                    return;
                }
                
                tasks.forEach(task => {
                    let newCard = new Card(task.taskName, task.taskDate, task.id, selectedDateString);
                    addedCardsJS.push(newCard);
                    newCard.createCssCard();
                });
            } else {
                let defaultCard = new Card("Izaberite datum da vidite zadatke", "📅", 0);
                defaultCard.createCssCard();
            }
        }

        // Task management functions
        function saveToCalendarLocalStorage(taskName, taskDate, id, dateString) {
            let tasks = JSON.parse(localStorage.getItem("calendarTasks")) || {};
            if (!tasks[dateString]) {
                tasks[dateString] = [];
            }
            tasks[dateString].push({ taskName, taskDate, id });
            localStorage.setItem("calendarTasks", JSON.stringify(tasks));
        }

        function deleteItemFromCalendarLocalStorage(id, dateString) {
            let tasks = JSON.parse(localStorage.getItem("calendarTasks")) || {};
            if (tasks[dateString]) {
                tasks[dateString] = tasks[dateString].filter(task => task.id !== id);
                if (tasks[dateString].length === 0) {
                    delete tasks[dateString];
                }
                localStorage.setItem("calendarTasks", JSON.stringify(tasks));
            }
        }

        // Event listeners for task management
        document.addEventListener('DOMContentLoaded', function() {
            LoadDays();
            
            let addTaskButton = document.getElementById("add");
            let removeTaskButton = document.getElementById("remove");
            let completeTaskButton = document.getElementById("complete");

            addTaskButton.addEventListener("click", function(event) {
                event.preventDefault();
                
                if (!selectedDateString) {
                    alert("Molimo izaberite datum pre dodavanja zadatka!");
                    return;
                }
                
                let taskName = document.getElementById("task-input").value;
                let taskDate = document.getElementById("deadline-input").value;
                
                if (taskName !== "" && taskDate !== "") {
                    let newCard = new Card(taskName, taskDate, order, selectedDateString);
                    addedCardsJS.push(newCard);
                    newCard.createCssCard();
                    saveToCalendarLocalStorage(taskName, taskDate, order, selectedDateString);
                    order++;
                    
                    // Clear inputs
                    document.getElementById("task-input").value = "";
                    document.getElementById("deadline-input").value = "";
                    
                    // Refresh calendar to show task indicator
                    LoadDays();
                    
                    // Reselect the date
                    setTimeout(() => {
                        document.querySelectorAll('.calendar-card').forEach(card => {
                            let cardDate = card.querySelector('.card-title').textContent;
                            if (parseInt(cardDate) === selectedDate && selectedDateString) {
                                card.classList.add('selected');
                            }
                        });
                    }, 100);
                } else {
                    alert("Molimo popunite sva polja.");
                }
            });

            removeTaskButton.addEventListener("click", function(event) {
                event.preventDefault();
                if (!selectedDateString) return;
                
                let allCards = document.querySelectorAll("#gridHolder .card");
                for (let i = 0; i < addedCardsJS.length; i++) {
                    if (addedCardsJS[i].changed === true) {
                        allCards[i].remove();
                        deleteItemFromCalendarLocalStorage(addedCardsJS[i].id, selectedDateString);
                        addedCardsJS.splice(i, 1);
                        i--; // Adjust index after removal
                    }
                }
                LoadDays(); // Refresh calendar
            });

            completeTaskButton.addEventListener("click", function(event) {
                event.preventDefault();
                let allCards = document.querySelectorAll("#gridHolder .card");
                for (let i = 0; i < addedCardsJS.length; i++) {
                    if (addedCardsJS[i].changed === true) {
                        if (allCards[i].style.textDecoration !== "line-through 4px") {
                            allCards[i].style.textDecoration = "line-through";
                            allCards[i].style.textDecorationThickness = "4px";
                        } else {
                            allCards[i].style.textDecoration = "none";
                            allCards[i].style.textDecorationThickness = "0px";
                        }
                        allCards[i].style.backgroundColor = "white";
                        allCards[i].querySelector("h2").style.color = "#212121";
                        allCards[i].style.outlineColor = "#212121";
                        addedCardsJS[i].changed = false;
                    }
                }
            });
        });
