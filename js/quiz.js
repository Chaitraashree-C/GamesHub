
const questions = [
    { question: "Which gas is the lightest?", options: ["Hydrogen", "Helium", "Ammonia", "Oxygen"], answer: 0, hint: "Used in balloons" },
    { question: "What is the capital of France?", options: ["Rome", "Paris", "Berlin", "Madrid"], answer: 1, hint: "City of Love" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2, hint: "It has a red spot" },
    { question: "What is the chemical symbol for gold?", options: ["Go", "Au", "Ag", "Pt"], answer: 1, hint: "From the Latin 'Aurum'" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], answer: 1, hint: "Famous for cherry blossoms" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2, hint: "It's the sum of 4 and 3" },
    { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: 1, hint: "It's an even number" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"], answer: 2, hint: "Known as the Bard of Avon" },
    { question: "What is the boiling point of water in Celsius?", options: ["0°C", "50°C", "100°C", "150°C"], answer: 2, hint: "It's a round number" },
    { question: "Which organ pumps blood in the human body?", options: ["Liver", "Heart", "Brain", "Lungs"], answer: 1, hint: "It's vital for circulation" },
    { question: "What is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Peacock"], answer: 1, hint: "A striped predator" },
    { question: "Which is the smallest planet in our solar system?", options: ["Mercury", "Venus", "Mars", "Pluto"], answer: 0, hint: "Closest to the Sun" },
    { question: "Which element has the atomic number 1?", options: ["Hydrogen", "Oxygen", "Nitrogen", "Helium"], answer: 0, hint: "The lightest element" },
    { question: "What is the currency of Japan?", options: ["Dollar", "Euro", "Yen", "Won"], answer: 2, hint: "Starts with 'Y'" },
    { question: "How many bones are there in an adult human body?", options: ["204", "206", "208", "210"], answer: 1, hint: "It's close to 205" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1, hint: "Fourth planet from the Sun" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, hint: "Not Sydney or Melbourne" },
    { question: "Who painted the Mona Lisa?", options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"], answer: 1, hint: "A Renaissance genius" },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2, hint: "It's between Asia and the Americas" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Iron", "Quartz"], answer: 1, hint: "Often found in jewelry" }
  ];
  
  
  let selectedQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 30;
  let timerInterval;
  
  function startQuiz() {
    document.getElementById("result").classList.add("hidden");
    document.querySelector(".quiz-container").classList.remove("hidden");
  
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    timer = 30;
  
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timer;
  
    loadQuestion();
    timerInterval = setInterval(() => {
      timer--;
      document.getElementById("timer").textContent = timer;
      if (timer === 0) endQuiz();
    }, 1000);
  }
  
  function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = currentQuestionIndex + 1;
    document.getElementById("question-text").textContent = question.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
      const optionEl = document.createElement("div");
      optionEl.classList.add("option");
      optionEl.textContent = option;
      optionEl.addEventListener("click", () => checkAnswer(index));
      optionsContainer.appendChild(optionEl);
    });
  
    const hintDisplay = document.getElementById("hint-display");
    hintDisplay.classList.remove("visible");
    hintDisplay.textContent = question.hint;
  
    document.getElementById("hint-button").onclick = () => hintDisplay.classList.toggle("visible");
  }
  
  function checkAnswer(selected) {
    const question = selectedQuestions[currentQuestionIndex];
    const options = document.querySelectorAll(".option");
    if (selected === question.answer) {
      score += 10;
      options[selected].classList.add("correct");
    } else {
      options[selected].classList.add("incorrect");
      options[question.answer].classList.add("correct");
    }
    document.getElementById("score").textContent = score;
  
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.querySelector(".quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("final-score").textContent = score;
    document.getElementById("total-time").textContent = 30 - timer;
  
    // Hide timer and score when quiz ends
    document.querySelector(".score-timer").classList.add("hidden");
  }
  
  document.getElementById("restart-button").onclick = startQuiz;
  
  startQuiz();
  