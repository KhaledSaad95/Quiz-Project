let mainDiv = document.querySelector(".quiz");
let category = document.querySelector(".cat");
let question = document.querySelector(".questions");
let count = document.querySelector(".count");
let spanTitle = document.querySelector(".title");
let spanContent = document.querySelector(".content");
let answers = document.querySelectorAll('input[name="answers"]');
let answerLabels = document.querySelectorAll('label[for^="answer"]');
let mainForm = document.querySelector("form");
let submit = document.querySelector("#submit");
let divTest = document.querySelector(".test")
let timer = document.querySelector(".timer");
let data = fetch("quizs.json");
let existData = data.then((res) => res.json());




existData.then((res) => {
    let resp = [];
    while (resp.length < res.length) {
        let index = Math.floor(Math.random() * res.length);
        if ((resp.indexOf(res[index]) === -1) && (resp.lastIndexOf(res[index]) === -1)) {
            resp.push(res[index]);
        }
    }
    let z = 0;
    let score = 0;
    let innerInterval;

    for (let i = 0; i < answers.length; i++) {
        answerLabels[i].textContent = `${resp[0]["Answers"][i]}`;
    };

    for (let y = 1; y <= resp.length; y++) {
        let bullet = document.createElement("input");
        let labelTest = document.createElement("label");
        bullet.setAttribute("type", "radio");
        bullet.setAttribute("name", `questionSelect${y}`);
        bullet.setAttribute("id", `bulletTest${y}`);
        bullet.setAttribute("disabled", "true");
        labelTest.setAttribute("for", `bulletTest${y}`)
        divTest.appendChild(bullet);
        divTest.appendChild(labelTest);
    }

    let bulletsSelect = document.querySelectorAll(".test input");
    category.appendChild(document.createTextNode(`Category : ${resp[0]["category"]}`));
    count.appendChild(document.createTextNode(`Question Count : ${resp.length}`));
    spanTitle.appendChild(document.createTextNode(`${resp[0]["title"]}`));
    spanContent.appendChild(document.createTextNode(`${resp[0]["content"]}`));
    bulletsSelect[0].setAttribute("checked", "");



    let tima;
    function startTimer() {
        tima = 10;
        innerInterval = setInterval(function () {
            timer.textContent = `00:${String(tima).padStart(2, "0")}`
            tima--;
            if (tima < 0) {
                clearInterval(innerInterval);
                mainFunction();
                startTimer();
            }
        }, 1000);
    }
    startTimer();


    let mainFunction = function () {
        // check the answer 
        if (z < resp.length) {
            const selected = document.querySelector('input[name="answers"]:checked');
            if (selected && selected.value === resp[z]["rightAnswer"]) {
                console.log("right");
                score++;
            }
            z++;
            if (z === resp.length) {
                question.innerHTML = "";
                divTest.style.cssText = "display: none";
                mainDiv.style.cssText = "height: 185px";
                if (score < Math.round(resp.length / 3)) {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Bad, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: red; font-weight: bold";
                    question.appendChild(newSpan);
                } else if (Math.round(resp.length / 3) < score && score < Math.ceil(resp.length * 0.66666)) {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Good, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: orange; font-weight: bold";
                    question.appendChild(newSpan);
                } else {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Excellent, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: green; font-weight: bold";
                    question.appendChild(newSpan);
                }
            } else {
                // Render Next Question
                spanTitle.innerHTML = "";
                spanTitle.appendChild(document.createTextNode(`${resp[z]["title"]}`));
                spanContent.innerHTML = "";
                spanContent.appendChild(document.createTextNode(`${resp[z]["content"]}`));
                question.appendChild(spanTitle);
                question.appendChild(spanContent);
                question.appendChild(mainForm);
                bulletsSelect[z].setAttribute("checked", "");
                for (let u = 0; u < answerLabels.length; u++) {
                    answerLabels[u].textContent = "";
                    answerLabels[u].appendChild(document.createTextNode(`${resp[z]["Answers"][u]}`));
                }
            }
            answers.forEach(a => a.checked = false);
        }
    }



    submit.onclick = function (e) {
        e.preventDefault();
        let mainFunction = function () {
            const selected = document.querySelector('input[name="answers"]:checked');
            if (selected.value === resp[z]["rightAnswer"]) {
                console.log("right");
                score++;
            } else {
                score;
            };

            z += 1;
            if (z < resp.length) {
                spanTitle.innerHTML = "";
                spanTitle.appendChild(document.createTextNode(`${resp[z]["title"]}`));
                spanContent.innerHTML = "";
                spanContent.appendChild(document.createTextNode(`${resp[z]["content"]}`));
                question.appendChild(spanTitle);
                question.appendChild(spanContent);
                question.appendChild(mainForm);
                bulletsSelect[z].setAttribute("checked", "");

                for (let u = 0; u < answerLabels.length; u++) {
                    answerLabels[u].textContent = "";
                    answerLabels[u].appendChild(document.createTextNode(`${resp[z]["Answers"][u]}`));
                }
            } else {
                question.innerHTML = "";
                divTest.style.cssText = "display: none";
                mainDiv.style.cssText = "height: 185px";
                console.log(`score is ${score}`)
                if (score < Math.round(resp.length / 3)) {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Bad, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: red; font-weight: bold";
                    question.appendChild(newSpan);
                } else if (Math.round(resp.length / 3) < score && score < Math.ceil(resp.length * 0.66666)) {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Good, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: orange; font-weight: bold";
                    question.appendChild(newSpan);
                } else {
                    let newSpan = document.createElement("span");
                    newSpan.appendChild(document.createTextNode(`Excellent, ${score} From ${resp.length}`));
                    newSpan.style.cssText = "color: green; font-weight: bold";
                    question.appendChild(newSpan);
                }
            }
            answers.forEach(a => a.checked = false);
        }

        e.preventDefault();
        mainFunction();
        tima = 10;
    }
});

// Problems

// fix the selection of questions bullets [Done]
// make question random and answers random
// make the score count if i chose the answer and before press submit [Done]
// make the bullet not checked till the questions is passed [Done]
// make the timer reset if i press submit [Done]




// arry.map((e, index) => {
//     index = [Math.floor(Math.random() * arry.length)];
//     if (!arry.indexOf(e[index])) {
//         arry.push(e[index]);
//     }
//     return arry;
//     // if (index) {

//     //     return arry[index];
//     // }
// })


// while (arry.length < arryIndex.length) {
//     let index = Math.floor(Math.random() * arry.length);
//     if (arry.indexOf(arry[index]) === -1) {
//         arryIndex.push(arry[index]);
//     }
// }
// let i = 0



/*
let arry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let arryIndex = [];
while (arryIndex.length < arry.length) {
    let index = Math.floor(Math.random() * arry.length);
    if ((arryIndex.indexOf(arry[index]) === -1) && (arryIndex.lastIndexOf(arry[index]) === -1)) {
        arryIndex.push(arry[index]);
    }
}
console.log(arryIndex)
*/






