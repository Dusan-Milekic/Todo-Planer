class Card{
    constructor(name, date, id) {
        this.name = name;
        this.date = date;
        this.id = id;
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
    }
}