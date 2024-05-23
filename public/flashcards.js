const card_container = document.getElementById("flashcards_main")
let term_list = []
let definition_list = []

window.onload = create_cards()



function create_cards() {
    term_list = JSON.parse(localStorage.terms)
    definition_list = JSON.parse(localStorage.definitions)
    
    for(i=0; i<term_list.length; i++) {
        
        //Skapar kort-div
        let card = document.createElement("div")
        card.classList.add("card")
        
        card.setAttribute('onclick', 'flip_card()')

        //Skriver Term på div
        let term = document.createElement("p")
        term.classList.add("term")
        term.innerHTML = term_list[i]

        card.appendChild(term)



        card_container.appendChild(card)
    }

}

function flip_card() {
    card = card_container.children[0]
    card.classList.toggle("card_flipped")

    setTimeout(change_term, 300)

    function change_term() {

        if(card.children[0].innerHTML == term_list[0]){
            card.children[0].innerHTML = definition_list[0]
        } else {
            card.children[0].innerHTML = term_list[0]
        }
            
        card.children[0].classList.toggle("term_flipped")
    }
    
}