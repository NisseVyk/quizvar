const card_container = document.getElementById("flashcards_main")
let term_list = []
let definition_list = []
let shown_card = 0

window.onload = create_cards()

function create_cards() {
    term_list = JSON.parse(localStorage.terms)
    definition_list = JSON.parse(localStorage.definitions)
    
    for(i=0; i<term_list.length; i++) {
        
        //Skapar kort-div
        let card = document.createElement("div")
        card.classList.add("card")
        
        card.setAttribute('onclick', `flip_card(${i})`)
        if(i!=0) {
            card.classList.add("right")
        }

        //Skriver Term på div
        let term = document.createElement("p")
        term.classList.add("term")
        term.innerHTML = term_list[i]

        card.appendChild(term)
        card_container.appendChild(card)
    }

}

function flip_card(num) {
    card = card_container.children[num]
    card.classList.toggle("card_flipped")

    setTimeout(change_term, 150)

    function change_term() {

        if(card.children[0].innerHTML == term_list[num]){
            card.children[0].innerHTML = definition_list[num]
        } else {
            card.children[0].innerHTML = term_list[num]
        }
            
        card.children[0].classList.toggle("term_flipped")
    }
}

function change_card(amount) {
    let cards = card_container.children
    console.log(shown_card-1)
    if(amount>0 && shown_card<cards.length-1) {
        cards[shown_card].classList.add("left")
        cards[shown_card+1].classList.remove("right")
        shown_card+=amount
    } else if(shown_card-1>=0 && amount<0) {
        cards[shown_card].classList.add("right")
        cards[shown_card-1].classList.remove("left")
        shown_card+=amount
    }
}