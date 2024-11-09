// Function to generate a new quiz question
function quizSpawner() {
    document.getElementById("questionContainer").innerHTML = `<p id="question">${dataSel.question}</p>`

    responses = [dataSel.response, ...dataSel.wrong_responses];
    idxUnavailable = [];

    if (btns.length > 0) {
        btns.forEach(btn => {
            btn.remove();
        });
    }

    for (let i=0; i<4; i++) {
        const btn = document.createElement("button");
        btn.id = `choice${i+1}`;
        btn.classList.add("choice");
        btn.name = `${i+1}`;
        let idx = Math.floor(Math.random()*responses.length);

        while ( idxUnavailable.includes(idx) ) {
            idx = Math.floor(Math.random()*responses.length);
        }

        idxUnavailable.push(idx)
        btn.innerText = responses[idx]

        if ( responses[idx] === responses[0] ) {
            btn.classList.add("good-response")
        }
        
        btns.push(btn);
        document.getElementById("quiz").appendChild(btn);
    };
}

// Funtions to manage the style of the buttons 
function choose(btnName) {
    for (let i=0; i<choices.length; i++) {;
        choices[i].setAttribute("style", "background: var(--fg);color: var(--bg);")
        choices[i].classList.remove("select")
    };

    choices.namedItem(btnName).setAttribute("style", "background: var(--bg);color: var(--fg);");
    choices.namedItem(btnName).classList.add("select");
};

function setEventChoose() {
    for (let i=0; i<choices.length; i++) {
        choices[i].disabled = false;
        choices[i].addEventListener("click", ev=> {
            choose(i+1);
        });
    };
};

function delEventChoose() {
    for (let i=0; i<choices.length; i++) {
        choices[i].disabled = true
    };
};
// =============================================

// Fuctions to validate the answer and do the animations if the answer is correct or wrong
function fwStart() {
    myFW1.start();myFW2.start();myFW3.start();myFW4.start();

    let boxAnimation = document.createElement("div");
    boxAnimation.id = "boxAnimation";
    document.getElementsByTagName("body")[0].appendChild(boxAnimation)

    const audio = document.createElement("audio");
    audio.src = "fireworks.mp3";
    audio.autoplay = true;
    boxAnimation.appendChild(audio);

    return false;
};

function wrongAnimation() {
    let boxAnimation = document.createElement("div");
    boxAnimation.id = "boxAnimation";
    document.getElementsByTagName("body")[0].appendChild(boxAnimation);
    const idWrongAnswer = "animationWrongAnswer";


    const video = document.createElement("video");
    video.src = dataSel.wrongAnswerAnimation;
    video.id = idWrongAnswer;

    video.style = `
    width: 100px; height: 100px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(6);
    `;

    playVideo(video);

    varStyle.style.setProperty("--fg", "rgb(125, 12, 0)");
    varStyle.style.setProperty("--bg", "grey");
    
    boxAnimation.appendChild(video);
}

async function playVideo(video) {
    promiseVideoStart = new Promise( () => {
        const timeoutID = setTimeout( () => {
            video.play();
        }, 900);

        cancelPlayVideo =  () => {
            clearTimeout(timeoutID);
        };

    });
};

function funcValidation() {
    goodAnswer = false;
    for (let btn of btns) {
        if (btn.classList.contains("select") && btn.classList.contains("good-response")) {
            goodAnswer = true;
            return fwStart();
        };
    }; return wrongAnimation();
    
};

function canValidate() {
    for (let btn of btns) {
        if (btn.classList.contains("select")) return true;
    } return false
}

// ==============================================

// Function to go to the next question
function funcNext() {
    cancelPlayVideo();
    document.getElementById("boxAnimation").remove();

    varStyle.style.setProperty("--fg", "rgb(12, 66, 35)");
    varStyle.style.setProperty("--bg", "rgba(202, 185, 165, 0.454)");

    for (let i=0; i<choices.length; i++) {;
        choices[i].setAttribute("style", "background: var(--fg);color: var(--bg);")
        choices[i].classList.remove("select")
    };

    myFW1.stop();myFW2.stop();myFW3.stop();myFW4.stop();

    if (goodAnswer) {
        idxDataSel ++;
        if (idxDataSel < firstQuiz+nbQuiz) {
            dataSel = data[idxDataSel];
            quizSpawner();
        };
    };
    
    return false;
};


// Creation of the quiz
let responses = [];
let idxUnavailable = [];
const btns = []; // List of buttons
let goodAnswer;
let cancelPlayVideo = () => {};
quizSpawner();

// Elements of structure
const quizForm = document.getElementById("quiz");
const btnConfimation = document.getElementById("validation");
const btnNext = document.getElementById("next");
const choices = quizForm.children; // HTML Collection of buttons
const varStyle = document.querySelector(":root");

// Display
setEventChoose(); // Style of the selected button
btnNext.disabled = true; // Enable next button

// Event listeners
quizForm.addEventListener("submit", ev=> {
    ev.preventDefault(); // Prevent form submission
});

btnConfimation.addEventListener("click", ev=>{
    if (canValidate()) {
        funcValidation();
        delEventChoose();
    
        btnConfimation.disabled = true;
        btnNext.disabled = false;
    }

});

btnNext.addEventListener("click", ev=> {
    for (let i=0; i<btns.length; i++) {
        btns[i].disabled = false;
    };

    funcNext();
    setEventChoose();

    btnConfimation.disabled = false;
    btnNext.disabled = true;
});


addEventListener("keydown", (e) => {
    if ((e.key === " " || e.key === "Enter") && !btnConfimation.disabled) {
        if (canValidate()) {
            funcValidation();
            delEventChoose();
    
            btnConfimation.disabled = true;
            btnNext.disabled = false;
        }
    } else if (e.key === "ArrowRight" && !btnNext.disabled) {
        for (let i=0; i<btns.length; i++) {
            btns[i].disabled = false;
        };
      
        funcNext();
        setEventChoose();
    
        btnConfimation.disabled = false;
        btnNext.disabled = true;
    } else if (e.key === "&") {
        choose(1);
    } else if (e.key === "é") {
        choose(2);
    } else if (e.key === "\"") {
        choose(3);
    } else if (e.key === "\'") {
        choose(4);
    }
}) 