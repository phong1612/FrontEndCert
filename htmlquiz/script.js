const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')

const questionContainer = document.getElementById('question-container')
const questionELement = document.getElementById('question')
const answerBtn = document.getElementById('answer-btn')


let shuffledQuestion, currQuestionIndex;
let quizScore = 0;

// startBtn.addEventListener('click', startGame)
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currQuestionIndex++
    setNextQuestion()
})

function startGame() {
    quizScore = 0;
    startBtn.classList.add('hide');
    shuffledQuestion = question.sort(() => Math.random() - 0.5);
    currQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
    
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currQuestionIndex])
}

function showQuestion(question) {
    questionELement.innerText = `Question ${currQuestionIndex}/${shuffledQuestion.length}` + question.question;
    question.answer.forEach((answer) => {
        const btn = document.createElement('button');
        btn.innerText = answer.text;
        btn.classList.add('btn');
        if(answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener('click', selectAnswer);
        answerBtn.appendChild(btn);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide');
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(element) {
    const selectedBtn = element.target;
    const correct = selectedBtn.dataset.correct;

    setStatus(document.body, correct);
    Array.from(answerBtn.children).forEach((btn) => {
        if(btn.dataset.correct) {
            setStatus(btn, btn.dataset.correct);
        }
        setStatus(selectedBtn, selectedBtn.dataset.correct)
    })
    if(shuffledQuestion.length > currQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    }
    else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }
    if(selectedBtn.dataset = correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerHTML = 'Score: ' + quizScore;
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function setStatus(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

const question = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answer: [
            {text: 'Python', correct: false},
            {text: 'Django', correct: false},
            {text: 'React', correct: true},
            {text: 'Eclipse', correct: false}
        ],
    },
    {
        question: 'Who is the current president of USA',
        answer: [
            {text: 'Donald Trump', correct: true},
            {text: 'Joe Biden', correct: false},
            {text: 'Osama Bin Laden', correct: false},
            {text: 'Barack Obama', correct: false}
        ],
    },
    {
        question: 'What is 4 + 3',
        answer: [
            {text: '8', correct: false},
            {text: '4', correct: false},
            {text: '7', correct: true},
            {text: '12', correct: false}
        ],
    }
]