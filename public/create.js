const server = "http://10.0.90.26:3000"
const question_container = document.getElementById("question_container")

window.onload = add_field()


function createTable() {
    let termlist = []
    for(i=0; i<question_container.children.length; i++) {
        let question = question_container.children[i].children[1]
        if(question.firstChild.value || question.children[1].value){
            let templist = [String(question.firstChild.value), String(question.children[1].value)]
            termlist.push(templist)
        }
    }
    console.log(termlist.length)
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        table: document.getElementById("title").value,
        term_list: termlist
    }));
    //console.log("1")
}



function add_field() {

    const question_number = question_container.children.length

    // Main div
    let question = document.createElement("div")
    question.classList.add("question")
    
    // Övre bar
    let remove_button_container = document.createElement("div")
    remove_button_container.classList.add("remove_button_container")

    // Siffra
    let siffra = document.createElement("p")
    siffra.classList.add("siffra")
    siffra.innerHTML = question_number + 1
    remove_button_container.appendChild(siffra)

    // Ta bort knapp
    let trash_can = document.createElement("img")
    trash_can.classList.add("trash_can")
    trash_can.setAttribute('src', "trash_can.png")
    trash_can.setAttribute('onclick', "remove_field(" + question_number + ")")
    remove_button_container.appendChild(trash_can)

    // Nedre bar
    let term_container = document.createElement("div")
    term_container.classList.add("term_container")

    const term_input = document.createElement("input")
    term_input.type = "text"
    term_input.classList.add("term_input")
    term_input.placeholder = "Enter term"

    const definition_input = document.createElement("input")
    definition_input.type = "text"
    definition_input.classList.add("term_input")
    definition_input.placeholder = "Enter definition"

    term_container.appendChild(term_input)
    term_container.appendChild(definition_input)

    question.appendChild(remove_button_container)
    question.appendChild(term_container)

    
    question_container.appendChild(question);
}

function remove_field(i) {
    if (question_container.children.length > 1) {
        const element = question_container.children[i]
        element.remove()
    }

    for (let i = 0; i < question_container.children.length; i++){
        question_container.children[i].firstChild.firstChild.innerHTML = i+1
    }
}

