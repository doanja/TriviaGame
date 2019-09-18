const dict = [];
let copyOfDict = [];
let correctAnswers, incorrectAnswers, unanswered, totalQstns, qstnCounter; // counters for player score
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
  const time = $('<h5>', { id: 'time' }).text('Time Remaining: 30 Seconds');
  const question = $('<h3>', { id: 'question' }).text(qstn);
  const msg = $('<h4>', { id: 'msg' });
  const subMsg = $('<h4>', { id: 'subMsg' });
  const row = $('<div>', { class: 'row' });

  // append the elements to the html
  parentElement.append(time, question, msg, subMsg, row);
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
    class: 'btn btn-outline-light',
    id: 'answers-' + num
  }).text(answr);

  // append the elements to the html
  col.append(answers);
  parentElement.append(col);
};

const renderEndGameStats = parentElement => {
  const correctTxt = $('<h4>').text('Correct Answers: ' + correctAnswers);
  const incorrectTxt = $('<h4>').text('Incorrect Answers: ' + incorrectAnswers);
  const unansweredTxt = $('<h4>').text('Unaswered: ' + unanswered);
  const hr = $('<hr>');
  const button = $('<button>', {
    id: 'start-over-btn',
    class: 'btn btn-outline-light'
  }).text('Start Over?');

  parentElement.append(correctTxt, incorrectTxt, unansweredTxt, hr, button);
};

/**
 * function to randomly select a question: answer set, render them and check for game logic
 * @param {object} problem a random object containing an answer with an array of answers
 */
const loadQstn = (problem = dict[Math.floor(Math.random() * dict.length)]) => {
  // increment the counter
  qstnCounter++;

  // check if all questions have been asked
  if (qstnCounter === totalQstns) {
    // clear the #answerWrap
    $('#answersWrap').empty();

    // clear the question timer
    clearInterval(questionInterval);

    // render end game stats
    renderEndGameStats($('#answersWrap'));

    $('#start-over-btn').click(initGlobals);
  } else {
    // timer countdown for each question
    questionInterval = setInterval(timeForCurrentQuestion, 1000);

    // clear previous question (if any)
    $('#answersWrap').empty();

    // renders the question
    renderQuestion($('#answersWrap'), problem.question);

    // reference to the correct answer stored in index 0 of problem.answers
    const theCorrectAnswer = problem.answers[0];

    // create a mutable copy of problem.answers
    const copyOfAnswers = [...problem.answers];

    // render the answers
    for (let i = 0; i < 4; i++) {
      // grab a random answer
      const randomAnswer =
        copyOfAnswers[Math.floor(Math.random() * copyOfAnswers.length)];

      // render a button with the random answer as text
      renderAnswers($('.row'), i, randomAnswer);

      // remove the answer from the array
      copyOfAnswers.splice(copyOfAnswers.indexOf(randomAnswer), 1); // remove the random answer

      // attach a click listener to the button and check the answer
      $('#answers-' + i).click(() => {
        // if the answer is correct
        if (randomAnswer === theCorrectAnswer) {
          answerClicked(0, theCorrectAnswer);
        }

        // if the answer is incorrect
        else if (randomAnswer !== theCorrectAnswer) {
          answerClicked(1, theCorrectAnswer);
        }
      });
    }
  }
};

/**
 * function to decrement the questionTime, and calls the nextQuestionCountdown
 * when the questionTime reaches 0, function also handles incrementing noAnswers counter
 */
const timeForCurrentQuestion = () => {
  questionTime--; // decrement time
  $('#time').text('Time Remaining: ' + questionTime + ' Seconds'); // render the countdown

  // when the questionTime reaches 0
  if (questionTime === 0) {
    unanswered++;
    $('#msg')
      .text('Time has ran out...')
      .attr('class', 'text-danger');
    nextQuestionCountdown();
  }
};

/**
 * function to clear the questionTime countdown, reset it, and start the breakTime countdown
 */
const nextQuestionCountdown = () => {
  $('.row').empty();
  clearInterval(questionInterval); // stop the countdown
  questionTime = MAX_QUESTION_TIME; // reset the time
  breakInterval = setTimeout(() => {
    loadQstn(); // start the countdown for the next question
  }, 5000);
};

/**
 *
 * @param {integer} isCorrect integer used to determine if the answer is correct (0), otherwise 1
 * @param {string} correctAnswer the correct answer
 */
const answerClicked = (isCorrect, correctAnswer) => {
  // start breakTime countdown
  nextQuestionCountdown();

  // disable button clicks
  $('.row').empty();

  if (isCorrect === 0) {
    correctAnswers++;

    // update the html to show the player got the question right
    $('#msg')
      .text('Correct')
      .attr('class', 'text-success');
  } else {
    incorrectAnswers++;

    // update html to show player got the question wrong and display the correct answer
    $('#msg')
      .text('Incorrect')
      .attr('class', 'text-danger');
    $('#subMsg')
      .attr('class', 'text-danger')
      .text('The correct answer was: ' + correctAnswer);
  }
};

const loadDictionary = () => {
  dict.push(
    {
      question: 'What is the diameter of Earth?',
      answers: ['8,000 miles', '9,300 miles', '7,800 miles', '10,680 miles']
    },
    {
      question: 'Great Whites and Hammerheads are what type of animals?',
      answers: ['Sharks', 'Dolphins', 'Whales', 'Fish']
    }
    // ,
    // {
    //   question:
    //     'Which famous nurse was known as “The Lady Of The Lamp” during the crimean war?',
    //   answers: [
    //     'Florence Nightingale',
    //     'Marie Curie',
    //     'Jane Austen',
    //     'Eleanor of Aquitaine'
    //   ]
    // },
    // {
    //   question: 'If you boil water you get?',
    //   answers: ['Steam', 'Water', 'Air', 'Oxygen']
    // },
    // {
    //   question: 'Where did the Olympic Games originate?',
    //   answers: ['Greece', 'Brazil', 'China', 'Canada']
    // }
  );
  totalQstns = dict.length;
};

const initGlobals = () => {
  $('#answersWrap').empty();
  $('#answersWrap').hide();
  $('#startWrap').show(); // hide start screen

  // initialize variables / reset variables
  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
  qstnCounter = -1;
  questionTime = MAX_QUESTION_TIME;
  breakTime = MAX_BREAK_TIME;
  // clearInterval(questionInterval);
  // clearInterval(breakInterval);
};

const loadGame = () => {
  $('#startWrap').hide(); // hide start screen
  $('#answersWrap').show();

  loadDictionary(); // fill the dictionary with triva questions

  loadQstn(); // load the first question
};

window.onload = () => {
  initGlobals();
  $('#play-button').click(loadGame);
};
