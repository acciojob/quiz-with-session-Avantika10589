// Retrieve saved answers from sessionStorage or start fresh
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");

function renderQuestions() {
  questionsElement.innerHTML = ""; // clear old questions if any
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Submit button
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Restore score after refresh
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render after DOM is loaded
document.addEventListener("DOMContentLoaded", renderQuestions);
