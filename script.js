let timer = document.getElementsByClassName("timer")[0];
let quizContainer = document.getElementById("container");
let nextButton = document.getElementById("next-button");
let numOfQuestions = document.getElementsByClassName("number-of-questions")[0];
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;
// For hex codes
let letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// Questions and Options Array
let quizArray = [];

// Function to generate a random value from an array
const generateRandomValue = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Generate Hex Codes
const colorGenerator = () => {
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    newColor += generateRandomValue(letters);
  }
  return newColor;
};

// Populating Quiz Array
function populateQuiz() {
  for (let i = 0; i < 10; i++) {
    // assuming you want 10 questions
    let correctColor = colorGenerator();
    let optionsArray = [correctColor];

    while (optionsArray.length < 4) {
      let colorOption = colorGenerator();
      if (!optionsArray.includes(colorOption)) {
        optionsArray.push(colorOption);
      }
    }

    quizArray.push({
      correct: correctColor,
      options: optionsArray,
    });
  }
}

// Display the next question
function displayNext() {
  questionCount += 1;
  if (questionCount === quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    numOfQuestions.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " Question";
    quizDisplay(questionCount);
    count = 10;
    clearInterval(countdown);
    timerDisplay();
  }
  nextButton.classList.add("hide");
  // Re-enable the "Next" button
  nextButton.style.pointerEvents = "auto";
}
document.querySelectorAll(".option-div").forEach((option) => {
  option.addEventListener("click", function () {
    checker(this);
    // Ensure next button is enabled
    nextButton.classList.remove("hide");
    nextButton.style.pointerEvents = "auto";
  });
});
document.querySelectorAll(".option-div").forEach((option) => {
  option.addEventListener("click", function () {
    checker(this);
    nextButton.classList.remove("hide");
    nextButton.style.pointerEvents = "auto"; // Ensure "Next" button is enabled
  });
});

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    timer.innerHTML = `<span>Time Left: </span> ${count}s`;
    count--;
    if (count === 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display Quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<div class="question-color">${i.correct}</div>`;
    div.appendChild(questionDiv);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    i.options.forEach((option) => {
      let button = document.createElement("button");
      button.classList.add("option-div");
      button.setAttribute("data-option", option);
      button.style.backgroundColor = option; // Set background color
      buttonContainer.appendChild(button);
    });

    div.appendChild(buttonContainer);
    quizContainer.appendChild(div);
  }

  document.querySelectorAll(".option-div").forEach((option) => {
    option.addEventListener("click", function () {
      checker(this);
    });
  });
}

function checker(userOption) {
  let userSolution = userOption.getAttribute("data-option");
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  // Check if the user option is correct
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    userOption.style.border = "3px solid green"; // Add green border to the correct option
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    userOption.style.border = "3px solid red"; // Add red border to the incorrect option
    // Add green border to the correct option
    options.forEach((element) => {
      if (
        element.getAttribute("data-option") === quizArray[questionCount].correct
      ) {
        element.classList.add("correct");
        element.style.border = "3px solid green"; // Add green border to the correct option
      }
    });
  }

  clearInterval(countdown);
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
  nextButton.classList.remove("hide");
}

function initial() {
  nextButton.classList.add("hide");
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  clearInterval(countdown);
  count = 10;
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//Restart game
restart.addEventListener("click", () => {
  quizArray = [];
  populateQuiz();
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//When user clicks on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  quizArray = [];
  populateQuiz();
  initial();
});
nextButton.addEventListener("click", displayNext);
