/* jshint esversion: 6 */

var step = 0;
var selectedColor = ""; // Lagrar den aktuellt valda färgen

function toggleBackground() {
    var backgroundDiv = document.getElementById("backgroundTest");
    var colorButtons = document.getElementById("colorButtons");

    if (!backgroundDiv) {
        console.error("Elementet backgroundTest hittades inte.");
        return;
    }

    console.log("toggleBackground körs! Steg:", step);

    if (step === 0) {
        backgroundDiv.style.backgroundImage = "url('images/closed.png')";
        colorButtons.style.display = "none";
        console.log("Bakgrund satt till: images/closed.png");
    } else if (step === 1) {
        backgroundDiv.style.backgroundImage = "url('images/open_red.png')";
        colorButtons.style.display = "flex";
        toggleColorButtons(["red", "purple", "light-blue", "orange"]);
        console.log("Bakgrund satt till: images/open_red.png");
    } else if (step === 2) {
        backgroundDiv.style.backgroundImage = "url('images/closed.png')";
        colorButtons.style.display = "none";
        console.log("Bakgrund satt till: images/closed.png");
    } else if (step === 3) {
        backgroundDiv.style.backgroundImage = "url('images/open_yellow.png')";
        colorButtons.style.display = "flex";
        toggleColorButtons(["yellow", "green", "pink", "blue"]);
        console.log("Bakgrund satt till: images/open_yellow.png");
    }

    step = (step + 1) % 4;
}

// Funktion för att hantera synlighet av specifika färgknappar
function toggleColorButtons(colorsToShow) {
    var allColors = ["yellow", "green", "pink", "blue", "red", "purple", "light-blue", "orange"];
    allColors.forEach(color => {
        var button = document.querySelector(`.color-button.${color}`);
        if (colorsToShow.includes(color)) {
            button.style.display = "inline-block";
            console.log(`Visar knapp för färg: ${color}`);
        } else {
            button.style.display = "none";
            console.log(`Döljer knapp för färg: ${color}`);
        }
    });
}

// Funktion när en färg väljs
function selectColor(color) {
    selectedColor = color; // Spara den valda färgen
    var currentQuestion = questions[color];
    if (currentQuestion) {
        document.getElementById("questionText").innerText = currentQuestion.text;
        document.getElementById("feedbackText").innerText = ""; // Rensa eventuell tidigare feedback
        document.getElementById("questionBox").style.display = "flex";
        console.log("Visar fråga för färg:", color);
    } else {
        console.error("Ingen fråga tillgänglig för färg:", color);
    }
}

// Frågor och feedback för varje färg
var questions = {
    yellow: {
        text: "Får man spola ner pappershanddukar i toaletten?",
        feedback: {
            A: "Nej, Rätt svar! Pappershanddukar ska slängas i papperskorgen.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    green: {
        text: "Kan man spola ner babywipes/våtservetter?",
        feedback: {
            A: "Rätt svar, babywipes och våtservetter kan orsaka stopp, även om de marknadsförs som nedspolningsbara.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    pink: {
        text: "Är det okej att spola ner matrester?",
        feedback: {
            A: "Rätt svar, matrester kan orsaka stopp och locka till sig råttor",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    blue: {
        text: "Får man spola ner cigarettfimpar?",
        feedback: {
            A: "Rätt svar, fimpar hör hemma i papperskorgen.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    red: {
        text: "Kan man spola ner plast i toaletten?",
        feedback: {
            A: "Rätt svar, plast hör inte hemma i avloppet.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    purple: {
        text: "Är det okej att spola ner hår?",
        feedback: {
            A: "Rätt svar, hår kan trassla ihop sig och orsaka stopp.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    },
    "light-blue": {
        text: "Får man spola ner kiss och bajs?",
        feedback: {
            A: "Fel svar, prova igen.",
            B: "Rätt svar, toaletter gillar kiss och bajs.",
            C: "Fel svar, prova igen."
        }
    },
    orange: {
        text: "Kan man spola ner blöjor?",
        feedback: {
            A: "Rätt svar, blöjor ska aldrig spolas ner.",
            B: "Fel svar, prova igen.",
            C: "Fel svar, prova igen."
        }
    }
};

// Funktion för att visa feedback baserat på valt svar
function checkAnswer(selectedOption) {
    var currentQuestion = questions[selectedColor];
    
    if (currentQuestion && currentQuestion.feedback[selectedOption]) {
        var feedback = currentQuestion.feedback[selectedOption];
        document.getElementById("feedbackText").innerText = feedback;
        console.log("Visar feedback:", feedback);
    } else {
        document.getElementById("feedbackText").innerText = "Ingen feedback tillgänglig för detta alternativ.";
        console.log("Ingen feedback tillgänglig för alternativ:", selectedOption);
    }
}
function resetLoop() {
    step = 0; // Återställ till stängt läge
    toggleBackground(); // Anropa funktionen för att uppdatera bakgrunden
    document.getElementById("questionBox").style.display = "none"; // Dölj frågerutan
    selectedColor = ""; // Rensa vald färg
}

function startGame() {
    // Dölj startskärmen
    document.getElementById("startScreen").style.display = "none";

    // Visa loppans bakgrund och instruktionerna
    document.getElementById("backgroundTest").style.display = "block";
    document.getElementById("instructions").style.display = "block";

    // Starta spelet genom att sätta bakgrunden till "closed" (första steget)
    step = 0;
    toggleBackground();
}


function showQuestion() {
    document.getElementById("backgroundTest").style.display = "none"; // Dölj loppan
    document.getElementById("questionBox").style.display = "flex"; // Visa frågerutan
}

function resetGame() {
    document.getElementById("backgroundTest").style.display = "block"; // Visa loppan igen
    document.getElementById("questionBox").style.display = "none"; // Dölj frågerutan
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", startGame);
});
