   class Card {
      constructor(text, isCurrentMonth = true, isToday = false) {
        this.text = text;
        this.isCurrentMonth = isCurrentMonth;
        this.isToday = isToday;
      }
    }

    // Globalne promenljive za praćenje trenutnog meseca
    let displayMonth = new Date().getMonth();
    let displayYear = new Date().getFullYear();

    const monthNames = [
      'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
    ];

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
      return firstDay.getDay(); // 0 = nedelja, 1 = ponedelak, ..., 6 = subota
    }

    function updateMonthHeader() {
      document.getElementById('currentMonth').textContent = 
        `${monthNames[displayMonth]} ${displayYear}`;
    }

    function LoadDays() {
      let currentDate = new Date();
      let today = currentDate.getDate();
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear();
      
      // Broj dana u prikazanom mesecu
      let daysMax = daysInMonth(displayMonth, displayYear);
      
      // Prvi dan meseca (koji dan u nedelji)
      let firstDayOfWeek = getFirstDayOfMonth(displayMonth, displayYear);
      
      // Prethodni mesec za popunjavanje početka kalendara
      let prevMonth = displayMonth === 0 ? 11 : displayMonth - 1;
      let prevYear = displayMonth === 0 ? displayYear - 1 : displayYear;
      let prevMonthDays = daysInMonth(prevMonth, prevYear);
      
      // Get all row elements
      let rows = [
        document.getElementById('N1'),
        document.getElementById('N2'),
        document.getElementById('N3'),
        document.getElementById('N4'),
        document.getElementById('N5'),
        document.getElementById('N6')
      ];
      
      // Očisti postojeće sadržaje
      rows.forEach(row => {
        if (row) row.innerHTML = '';
      });
      
      let dayCounter = 1;
      let nextMonthDayCounter = 1;
      
      // Popuni kalendar
      for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
          let card;
          let isCurrentMonth = true;
          let isToday = false;
          
          if (week === 0 && day < firstDayOfWeek) {
            // Dani iz prethodnog meseca
            let prevMonthDay = prevMonthDays - firstDayOfWeek + day + 1;
            card = new Card(prevMonthDay, false, false);
            isCurrentMonth = false;
          } else if (dayCounter <= daysMax) {
            // Dani iz trenutnog meseca
            isToday = dayCounter === today && 
                     displayMonth === currentMonth && 
                     displayYear === currentYear;
            card = new Card(dayCounter, true, isToday);
            dayCounter++;
          } else {
            // Dani iz sledećeg meseca
            card = new Card(nextMonthDayCounter, false, false);
            nextMonthDayCounter++;
            isCurrentMonth = false;
          }
          
          // Kreiraj elemente
          let cardElement = document.createElement("div");
          
          // Dodeli klase na osnovu tipa dana
          if (card.isToday) {
            cardElement.classList.add('card', 'text-white', 'bg-primary', 'col', 'p-0', 'rounded-0');
          } else if (!isCurrentMonth) {
            cardElement.classList.add('card', 'text-muted', 'bg-secondary', 'col', 'p-0', 'rounded-0');
          } else {
            cardElement.classList.add('card', 'text-white', 'bg-dark', 'col', 'p-0', 'rounded-0');
          }
          
          let bodyElement = document.createElement("div");
          bodyElement.classList.add('card-body', 'p-1', 'p-sm-3');
          
          let titleElement = document.createElement("h4");
          titleElement.classList.add('card-title', 'm-0');
          titleElement.innerText = card.text;
          
          // Ugradi hijerarhiju
          bodyElement.appendChild(titleElement);
          cardElement.appendChild(bodyElement);
          
          // Dodaj click event
          cardElement.addEventListener('click', function() {
            selectDate(card.text, isCurrentMonth);
          });
          
          // Dodaj u odgovarajući red
          if (rows[week]) {
            rows[week].appendChild(cardElement);
          }
        }
      }
      
      updateMonthHeader();
    }

    function selectDate(day, isCurrentMonth) {
      if (isCurrentMonth) {
        console.log(`Izabran datum: ${day}.${displayMonth + 1}.${displayYear}`);
        // Ovde možeš dodati dodatnu logiku za selekciju datuma
      }
    }

    // Funkcija za menjanje meseca
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

    // Pokretanje kada se učita stranica
    document.addEventListener('DOMContentLoaded', function() {
      LoadDays();
    });