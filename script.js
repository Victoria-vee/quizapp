const quizData = [
  { q: "What is 1 + 1?", options: ["2", "5", "10", "N/A"], correct: 0 },
  { q: "What instrument does Squidward in the cartoon SpongeBob Squarepants play", options: ["Clarinet", "Piano", "Accordion", "Guitar"], correct: 0 },
  { q: "Which of these is NOT a root", options: ["64", "32", "1", "81"], correct: 1 },
  { q: "What's the most selling genre in novels", options: ["Romance", "Mystery", "Sci-Fi", "Horror"], correct: 0 },
  { q: "Who bought Warner Bros.", options: ["Disney", "Paramount", "Netflix", "Universal Studios"], correct: 2 },
  { q: "Which musical did Lin Manuel Miranda write", options: ["Epic: The Musical", "Hadestown", "Death Becomes Her", "Hamilton"], correct: 3 },
  { q: "Who has the most monthly listeners on Spotify", options: ["Taylor Swift", "The Weeknd", "Bruno Mars", "Ed Sheeran"], correct: 2 },
  { q: "When did Nigeria gain her Independence", options: ["1975", "1960", "1963", "1945"], correct: 1 },
  { q: "How many National Anthems does Nigeria have?", options: ["2", "5", "3", "4"], correct: 2 },
  { q: "What is 5 * 3 ?", options: ["15", "8", "2", "17"], correct: 0 }
];

const question = document.getElementById('question-text');
const options = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  resetState();
  const currentQuestion = quizData[currentIndex];
  progress.innerText = `Question ${currentIndex + 1} of ${quizData.length}`;
  question.innerText = currentQuestion.q;
  
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectAnswer(index, button));
    options.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
}

function selectAnswer(index, button) {
  const correct = quizData[currentIndex].correct;
  const buttons = options.querySelectorAll('.option-btn');
  
  if (index === correct) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
    buttons[correct].classList.add('correct');
  }
  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  resetState();
  progress.innerText = "Quiz Completed!";
  question.innerText = `You scored ${score} out of ${quizData.length}!`;
  nextBtn.innerText = "Restart Quiz";
  nextBtn.style.display = 'block';
  nextBtn.onclick = () => location.reload();
}

loadQuestion();