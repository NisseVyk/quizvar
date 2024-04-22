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

    const input = document.createElement("input")
    input.type = "text"
    input.classList.add("question_input")
    question.appendChild(remove_button_container)
    question.appendChild(input)
    question.appendChild(input.cloneNode(true))

    
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