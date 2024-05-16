const server = "http://10.155.17.5:3000"
const quiz_list = document.getElementById("quiz_list")
let active_quiz = ""

window.onload = get_tables()

function get_tables() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${server}/tables`, true);

    xmlhttp.onload = () => {
        console.log("1")
        array = JSON.parse(xmlhttp.responseText);
        console.log(array)
        for(i=0; i<array.length; i++) {
            console.log("Penis")
            //Main div
            let quiz = document.createElement("div")
            quiz.classList.add("quiz")

            //Namn
            let name = document.createElement("p")
            name.classList.add("quiz_name")
            name.innerHTML = array[i]

            quiz.appendChild(name)
            quiz_list.appendChild(quiz)
        }
    }
    xmlhttp.send();
}

