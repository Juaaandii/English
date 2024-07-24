const verbs = [
    { present: "fly", past: "flew", participle: "flown", translation: "volar" },
    { present: "get", past: "got", participle: "gotten/got", translation: "obtener" },
    { present: "give", past: "gave", participle: "given", translation: "dar" },
    { present: "go", past: "went", participle: "gone", translation: "ir" },
    { present: "grow", past: "grew", participle: "grown", translation: "crecer" },
    { present: "hang", past: "hung", participle: "hung", translation: "colgar" },
    { present: "have", past: "had", participle: "had", translation: "tener" },
    { present: "hit", past: "hit", participle: "hit", translation: "golpear" },
    { present: "hear", past: "heard", participle: "heard", translation: "oir" },
    { present: "hold", past: "held", participle: "held", translation: "sostener" },
    { present: "hurt", past: "hurt", participle: "hurt", translation: "herir" },
    { present: "keep", past: "kept", participle: "kept", translation: "mantener" },
    { present: "kneel", past: "knelt/kneeled", participle: "knelt/kneeled", translation: "arrodillarse" },
    { present: "know", past: "knew", participle: "known", translation: "saber" },
    { present: "learn", past: "learned/learnt", participle: "learned/learnt", translation: "aprender" },
    { present: "leap", past: "leaped/leapt", participle: "leaped/leapt", translation: "saltar" },
    { present: "leave", past: "left", participle: "left", translation: "dejar" },
    { present: "lead", past: "led", participle: "led", translation: "liderar" },
    { present: "let", past: "let", participle: "let", translation: "permitir" },
    { present: "lie", past: "lay", participle: "lain", translation: "mentir" },
    { present: "lose", past: "lost", participle: "lost", translation: "perder" },
    { present: "make", past: "made", participle: "made", translation: "hacer" },
    { present: "mean", past: "meant", participle: "meant", translation: "significar" },
    { present: "meet", past: "met", participle: "met", translation: "encontrar" },
    { present: "mistake", past: "mistook", participle: "mistaken", translation: "equivocar" },
    { present: "pay", past: "paid", participle: "paid", translation: "pagar" },
    { present: "put", past: "put", participle: "put", translation: "poner" },
    { present: "read", past: "read", participle: "read", translation: "leer" },
    { present: "ride", past: "rode", participle: "ridden", translation: "montar" },
    { present: "ring", past: "rang", participle: "rung", translation: "llamar" },
    { present: "rise", past: "rose", participle: "risen", translation: "levantarse" }
];

let score = 0;
let time = 20;
let currentVerb;
let displayForm;
let timer;

const displayVerb = document.getElementById('display-verb');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const submitBtn = document.getElementById('submit-btn');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

function getRandomVerb() {
    return verbs[Math.floor(Math.random() * verbs.length)];
}

function setNewVerb() {
    currentVerb = getRandomVerb();
    const forms = ['present', 'past', 'participle'];
    displayForm = forms[Math.floor(Math.random() * forms.length)];
    displayVerb.textContent = currentVerb[displayForm];

    if (displayForm === 'present') {
        input1.placeholder = "Past Simple";
        input2.placeholder = "Past Participle";
    } else if (displayForm === 'past') {
        input1.placeholder = "Infinitive";
        input2.placeholder = "Past Participle";
    } else {
        input1.placeholder = "Infinitive";
        input2.placeholder = "Past Simple";
    }

    input3.placeholder = "Translation";

    input1.value = '';
    input2.value = '';
    input3.value = '';
    input1.focus();
    resetTimer();
}

function checkAnswers() {
    const answer1 = input1.value.trim().toLowerCase();
    const answer2 = input2.value.trim().toLowerCase();
    const answer3 = input3.value.trim().toLowerCase();

    function normalizeAnswer(answer, correctForms) {
        const forms = correctForms.split('/').map(form => form.trim().toLowerCase());
        return forms.includes(answer);
    }

    if (displayForm === 'present') {
        if (normalizeAnswer(answer1, currentVerb.past) && normalizeAnswer(answer2, currentVerb.participle) && answer3 === currentVerb.translation.toLowerCase()) {
            return true;
        }
    } else if (displayForm === 'past') {
        if (normalizeAnswer(answer1, currentVerb.present) && normalizeAnswer(answer2, currentVerb.participle) && answer3 === currentVerb.translation.toLowerCase()) {
            return true;
        }
    } else {
        if (normalizeAnswer(answer1, currentVerb.present) && normalizeAnswer(answer2, currentVerb.past) && answer3 === currentVerb.translation.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function showModalMessage(message) {
    modalMessage.textContent = message;
    modal.classList.add('visible');
}

function hideModal() {
    modal.classList.remove('visible');
}

function showCorrectAnswers() {
    let correctForms = "";
    if (displayForm === 'present') {
        correctForms = `Pasado: ${currentVerb.past}, Participio: ${currentVerb.participle}`;
    } else if (displayForm === 'past') {
        correctForms = `Presente: ${currentVerb.present}, Participio: ${currentVerb.participle}`;
    } else {
        correctForms = `Presente: ${currentVerb.present}, Pasado: ${currentVerb.past}`;
    }
    return `${correctForms}, Traducción: ${currentVerb.translation}`;
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function resetScore() {
    score = 0;
    scoreDisplay.textContent = score;
}

function updateTime() {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
        showModalMessage(`Tiempo agotado! Respuesta correcta: ${showCorrectAnswers()}`);
        setNewVerb();
    } else if (time <= 5) {
        timeDisplay.classList.add('time-warning');
    } else {
        timeDisplay.classList.remove('time-warning');
    }
}

function resetTimer() {
    clearInterval(timer);
    time = 30;
    timeDisplay.textContent = time;
    timeDisplay.classList.remove('time-warning');
    timer = setInterval(updateTime, 1000);
}

submitBtn.addEventListener('click', () => {
    if (checkAnswers()) {
        updateScore();
    } else {
        showModalMessage(`Respuesta incorrecta. Respuesta correcta: ${showCorrectAnswers()}`);
    }
    setNewVerb();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitBtn.click();
    }
});

modalCloseBtn.addEventListener('click', () => {
    hideModal();
    input1.focus();
});

setNewVerb();
