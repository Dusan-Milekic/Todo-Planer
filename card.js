class Card{
    constructor(name, date, id) {
        this.name = name;
        this.date = date;
        this.id = id;
        this.changed = false;
    }   
    createCssCard(){
        let root = document.getElementsByClassName("grid-holder")[0];
        const card = document.createElement("div");
        card.classList.add("card");
        let h2 = document.createElement("h2");
        h2.textContent = this.name;
        let p = document.createElement("p");
        p.textContent = this.date;
        card.appendChild(h2);
        card.appendChild(p);
        root.appendChild(card);

        
        card.addEventListener("click", () => {
             if (this.changed === true){
                card.style.backgroundColor = "white";
                h2.style.color = "#212121";
                card.style.outlineColor = "#212121";
                this.changed = false;
            }else{
                card.style.backgroundColor = "#212121";
                h2.style.color = "white";
                card.style.outlineColor = "white";
                this.changed = true;
            }

            
        }); // Bind 'this' to the current instance



    }
    
}