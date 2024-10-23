function setEventChoose() {
    for (let i=0; i<choices.length; i++) {
        choices[i].disabled = false;
        choices[i].addEventListener("click", ev=> {
            choose(i+1);
        });
    };
};

function choose(btnName) {
    for (let i=0; i<choices.length; i++) {;
        choices[i].setAttribute("style", "background: var(--fg);color: var(--bg);")
        choices[i].classList.remove("select")
    };

    choices.namedItem(btnName).setAttribute("style", "background: var(--bg);color: var(--fg);");
    choices.namedItem(btnName).classList.add("select");
};

function delEventChoose() {
    for (let i=0; i<choices.length; i++) {
        choices[i].disabled = true
    };
};

const quizForm = document.getElementById("quiz");
const btnConfimation = document.getElementById("validation");
const btnNext = document.getElementById("next");
const choices = quizForm.children

quizForm.addEventListener("submit", ev=> {
    ev.preventDefault();
});


setEventChoose();

btnConfimation.addEventListener("click", ev=>{
    delEventChoose();
});

btnNext.addEventListener("click", ev=> {
    for (let i=0; i<choices.length; i++) {
        choices[i].disabled = false;
    };
});