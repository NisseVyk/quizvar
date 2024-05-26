const server = "http://81.236.197.137:3000"
const quiz_list = document.getElementById("quiz_list")
let active_quiz = ""

window.onload = get_tables()

function get_tables() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${server}/list_tables`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        for(i=0; i<array[0].length; i++) {
            //Main div
            let quiz = document.createElement("div")
            quiz.classList.add("quiz")
            quiz.setAttribute('onclick', `selected_quiz("${array[0][i]}")`)

            //Namn
            let name = document.createElement("p")
            name.classList.add("quiz_name")
            name.innerHTML = array[1][i]
            //name.setAttribute('href', "study.html");

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
        localStorage.setItem("terms", JSON.stringify(term_list[0])); //lägger båda listorna på rad utan uppdelning
        localStorage.setItem("definitions", JSON.stringify(term_list[1]));
        console.log(term_list)
        window.location.assign('study.html')
    }

    xmlhttp.send();
}