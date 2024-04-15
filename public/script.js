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
    let question = document.createElement("div")
    question.classList.add("question")
    question.id = question_container.children.length.toString()
    
    const input = document.createElement("input")
    input.type = "text"
    input.classList.add("question_input")
    
    question.appendChild(input)
    question.appendChild(input.cloneNode(true))

    question_container.appendChild(question);
}

function remove_field() {
    if (question_container.children.length > 1) {
        const element = question_container.lastChild
        element.remove()
    }
}