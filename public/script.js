const server = "http://10.0.216.26:3000"
const question_container = document.getElementById("question_container")

window.onload = add_field()

function createTable() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let u = [["penis"], ["2", "balls"]]
    xhr.send(JSON.stringify({
        table: document.getElementById("title").value,
        name: u
    }));
    console.log("1")
}

function add_field() {

    // Main div
    let question = document.createElement("div")
    question.classList.add("question")
    question.id = question_container.children.length.toString()
    
    // Övre bar
    let remove_button_container = document.createElement("div")
    remove_button_container.classList.add("remove_button_container")

    // Siffra
    let siffra = document.createElement("p")
    siffra.classList.add("siffra")

    // Ta bort knapp
    let trash_can = document.createElement("svg")
    //trash_can.classList.add("trash_can")
    trash_can.setAttribute('role', "img")

    let inner_trash = document.createElement("use")
    inner_trash.setAttribute('xlink:href', "#garbage")

    trash_can.appendChild(inner_trash)

    // Nedre bar
    let term_container = document.createElement("div")
    term_container.classList.add("term_container")

    const input = document.createElement("input")
    input.type = "text"
    input.classList.add("question_input")
    
    question.appendChild(input)
    question.appendChild(input.cloneNode(true))

    question_container.appendChild(trash_can)
    question_container.appendChild(question);
}

function remove_field() {
    if (question_container.children.length > 1) {
        const element = question_container.lastChild
        element.remove()
    }
}