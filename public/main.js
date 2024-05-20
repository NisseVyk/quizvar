const server = "http://10.0.237.3:3000"
const quiz_list = document.getElementById("quiz_list")
let active_quiz = "10.0.237.3"

window.onload = get_tables()

function get_tables() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${server}/list_tables`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        for(i=0; i<array.length; i++) {
            //Main div
            let quiz = document.createElement("div")
            quiz.classList.add("quiz")
            quiz.setAttribute('onclick', `selected_quiz("${array[0][i]}")`)

            //Namn
            let name = document.createElement("p")
            name.classList.add("quiz_name")
            name.innerHTML = array[1][i]

            quiz.appendChild(name)
            quiz_list.appendChild(quiz)
        }
    }
    xmlhttp.send();
}

function selected_quiz(name) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${server}/get_table?table=${name}`, true);
    
    xmlhttp.onload = () => {
        term_list = JSON.parse(xmlhttp.responseText);
        localStorage.setItem("terms", term_list); //lägger båda listorna på rad utan uppdelning
    }

    xmlhttp.send();
}