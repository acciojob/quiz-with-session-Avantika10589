// Do not change code below this line
// This code will just display the questions to the screen
let obj={}
let output = document.getElementById("questions")
let submitButton=document.getElementById("submit")
let scoreText=document.getElementById("score")
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
    },
    {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
    },
];

// Display the quiz questions and choices
let score=0;
let storedOptions=JSON.parse(localStorage.getItem("progress"))||{};
let scoreBefore=localStorage.getItem("score") || 0;
score=scoreBefore;
obj=storedOptions;
function renderQuestions() {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if(storedOptions[`question-${i}`]===choice){
                choiceElement.checked=true
                choiceElement.setAttribute("checked","true")
            }
            // console.log(storedOptions[`question-${i}`])
            choiceElement.addEventListener("click", () => {
                // if (choiceElement.value === question.answer) {
                choiceElement.setAttribute("checked", true);
                let currentName = choiceElement.name
                // console.log(currentName)
                // console.log(choiceElement)
                obj[choiceElement.name] = choiceElement.value;
                localStorage.setItem("progress",JSON.stringify(obj))
                // checkScore(choiceElement.value,question.answer);
               
                // }

            })

            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        }
        // questionsElement.appendChild(questionElement);
        output.appendChild(questionElement)
    }
}
renderQuestions();


function checkScore(){
    for(let i=0;i<questions.length;i++){
        let userOption=obj[`question-${i}`]
        if(userOption===questions[i].answer){
            score=score+1;
        }
    }
}

submitButton.addEventListener("click",()=>{
    // console.log("click")
    // scoreText.textContent=""
    score=0
    checkScore()
    localStorage.setItem("score",score)
    scoreText.textContent=`Your score is ${score} out of 5.`
    console.log(score)
})