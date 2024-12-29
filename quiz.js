const questions = {
    science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Venus", "Saturn"], answer: "Mars" },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], answer: "Mitochondria" },
        { question: "What is the boiling point of water?", options: ["50°C", "100°C", "150°C", "200°C"], answer: "100°C" }
    ],
    it: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks Text Markup Language", "Home Tool Markup Language", "Hyperlinks Transfer Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "What is the main programming language for web development?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Which protocol is used for secure communication?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], answer: "HTTPS" },
        { question: "What is the full form of SQL?", options: ["Structured Query Language", "Standard Query Language", "System Query Language", "Simple Query Language"], answer: "Structured Query Language" }
    ],
    gk: [
        { question: "Who is known as the Father of India?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B. R. Ambedkar", "Sardar Patel"], answer: "Mahatma Gandhi" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
        { question: "What is the national animal of India?", options: ["Lion", "Elephant", "Peacock", "Tiger"], answer: "Tiger" },
        { question: "Who wrote the national anthem of India?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhas Chandra Bose"], answer: "Rabindranath Tagore" }
    ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timer;

function startQuiz(topic) {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    currentQuiz = questions[topic];
    currentIndex = 0;
    score = 0;
    startTimer(60);
    showQuestion();
}

function startTimer(seconds) {
    const timerEl = document.getElementById("timer");
    timerEl.textContent = `Time: ${seconds}`;
    timer = setInterval(() => {
        seconds--;
        timerEl.textContent = `Time: ${seconds}`;
        if (seconds === 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function showQuestion() {
    if (currentIndex >= currentQuiz.length) {
        clearInterval(timer);
        showResult();
        return;
    }
    const question = currentQuiz[currentIndex];
    document.getElementById("question").textContent = question.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(97 + index)}. ${option}`;
        button.onclick = () => checkAnswer(button, option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(button, selected) {
    const question = currentQuiz[currentIndex];
    if (selected === question.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        Array.from(document.getElementById("options").children).forEach(child => {
            if (child.textContent.includes(question.answer)) {
                child.classList.add("correct");
            }
        });
    }
    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 1000);
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = score;
}

function restartQuiz() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

function exitQuiz() {
    document.getElementById("result").classList.add("hidden");
    alert("Thanks for playing!");
}
