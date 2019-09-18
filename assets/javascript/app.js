const dict = [];
let correctAnswers, incorrectAnswers, noAnswers, totalQuestions; // counters for player score
let questionTime, questionInterval, breakTime, breakInterval;
const MAX_QUESTION_TIME = 5; // max time for the questionTime
const MAX_BREAK_TIME = 5; // max time for the breakTime

/**
 * function to create and render the question
 * @param {object} parentElement the element to append the question to
 * @param {object} qstn the question to append to the html
 */
const renderQuestion = (parentElement, qstn) => {
  // create the elements
  const time = $('<h3>', { id: 'time' }).text('Time Remaining: 30 Seconds');
  const question = $('<h5>', { id: 'question' }).text(qstn);
  const msg = $('<div>', { id: 'msg' });
  const row = $('<div>', { class: 'row' });

  // append the elements to the html
  parentElement.append(time, question, msg, row);
};

/**
 * function to create and render the answers
 * @param {object} parentElement the element to append the question to
 * @param {number} num the identifier assigned to the element
 * @param {string} answr the answer for a question
 */
const renderAnswers = (parentElement, num, answr) => {
  //create the elements
  const col = $('<col>', { class: 'col-12 mt-3' });
  const answers = $('<button>', {
    class: 'btn btn-primary',
    id: 'answers-' + num
  }).text(answr);

  // append the elements to the html
  col.append(answers);
  parentElement.append(col);
};

const loadGame = (problem = dict[Math.floor(Math.random() * dict.length)]) => {
  questionInterval = setInterval(timeForCurrentQuestion, 1000); // calls timeForCurentQuestion every 1 sec
  console.log('loadGame() is called');

  $('#answersWrap').empty(); // clear previous question (if any)

  renderQuestion($('#answersWrap'), problem.question); // renders the question

  // create a mutable copy of problem.answers
  const copyOfAnswers = [...problem.answers];

  // render the answers
  for (let i = 0; i < 4; i++) {
    const randomizedAnswer =
      copyOfAnswers[Math.floor(Math.random() * copyOfAnswers.length)]; // grab a random answer

    // render a button with the random answer as text
    renderAnswers($('.row'), i, randomizedAnswer);

    // remove the answer from the array
    copyOfAnswers.splice(copyOfAnswers.indexOf(randomizedAnswer), 1); // remove the random answer

    // attach a click listener to the button and check the answer
    $('#answers-' + i).click(() => {
      // if the answer is correct
      if (randomizedAnswer === problem.answers[0]) {
        correctAnswers++;
        console.log('true');
        nextQuestionCountdown();
        // disable button clicks
        // update the html to show the player got the question right
      }
      // if the answer is incorrect
      else if (randomizedAnswer !== problem.answers[0]) {
        incorrectAnswers++;
        console.log('nope');
        nextQuestionCountdown();
        // disable button clicks
        // update html to show player got the question wrong and display the correct answer
      }
    });
  }
};

const timeForCurrentQuestion = () => {
  questionTime--; // decrement time
  $('#time').text('Time Remaining: ' + questionTime + ' Seconds'); // render the countdown
  if (questionTime === 0) {
    noAnswers++;
    nextQuestionCountdown();
  }
};

const timeNextQuestion = () => {
  console.log('Count down before next question starts:', breakTime);
  breakTime--;
  if (breakTime === 0) {
    clearInterval(breakInterval); // clear time
    breakTime = MAX_BREAK_TIME; // reset the time
    loadGame();
  }
};

const nextQuestionCountdown = () => {
  clearInterval(questionInterval); // clear time
  questionTime = MAX_QUESTION_TIME; // start time
  breakInterval = setInterval(timeNextQuestion, 1000); // start next timer
};

const init = () => {
  // initialize variables
  correctAnswers = 0;
  incorrectAnswers = 0;
  noAnswers = 0;
  totalQuestions = 0;
  questionTime = MAX_QUESTION_TIME;
  breakTime = MAX_BREAK_TIME;

  $('#startWrap').hide(); // hide start screen

  initDictionary(); // fill the dictionary with triva questions

  loadGame(); // load the first question
};

const initDictionary = () => {
  dict.push(
    {
      question: 'What is the diameter of Earth?',
      answers: ['8,000 miles', '9,300 miles', '7,800 miles', '10,680 miles']
    },
    {
      question: 'Great Whites and Hammerheads are what type of animals?',
      answers: ['Sharks', 'Dolphins', 'Mammals', 'Reptiles']
    },
    {
      question:
        'Which famous nurse was known as “The Lady Of The Lamp” during the crimean war?',
      answers: [
        'Florence Nightingale',
        'Abigail Williams',
        'Napoleon Bonaparte',
        'Yugi Moto'
      ]
    }
  );
};

window.onload = () => {
  $('#play-button').click(init);
};
