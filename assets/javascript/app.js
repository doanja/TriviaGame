const dict = [];
let correctAnswers, incorrectAnswers, noAnswers;
let totalQuestions;
let questionTime, questionInterval, breakTime, breakInterval;

/*
 *  @param parentElement, the element to append elements to
 */
const renderQuestion = (parentElement, quest) => {
  const time = $('<h3>', { id: 'time' }).text('Time Remaining: 30 Seconds');
  const question = $('<h5>', { id: 'question' }).text(quest);
  const row = $('<div>', { class: 'row' });

  parentElement.append(time);
  parentElement.append(question);
  parentElement.append(row);
};

// call this function X amount of times
const renderAnswers = (parentElement, num, answersArr) => {
  const col = $('<col>', { class: 'col-12 mt-3' });
  const answers = $('<button>', {
    class: 'btn btn-primary',
    id: 'answers-' + num
  }).text(answersArr);

  col.append(answers);
  parentElement.append(col);
};

const loadGame = (problem = dict[Math.floor(Math.random() * dict.length)]) => {
  questionInterval = setInterval(timeForCurrentQuestion, 1000); // calls timeForCurentQuestion every 1 sec
  console.log('loadGame() is called');

  $('#answersWrap').empty();

  // [WIP] start timer here, if timer reaches 0, call load game

  renderQuestion($('#answersWrap'), problem.question);

  // create a mutable copy of problem.answers
  const copyOfAnswers = [...problem.answers];

  for (let i = 0; i < 4; i++) {
    const randomizedAnswer =
      copyOfAnswers[Math.floor(Math.random() * copyOfAnswers.length)]; // grab a random answer
    renderAnswers($('.row'), i, randomizedAnswer); // render a button with the random answer as text

    // remove the answer from the array
    copyOfAnswers.splice(copyOfAnswers.indexOf(randomizedAnswer), 1); // remove the random answer

    // attach a click listener to the button and check the answer
    $('#answers-' + i).click(() => {
      // if the answer is correct
      if (randomizedAnswer === problem.answers[0]) {
        correctAnswers++;
        console.log('true');
        // count down 5 seconds then load game
      }
      // if the answer is incorrect
      else if (randomizedAnswer !== problem.answers[0]) {
        incorrectAnswers++;
        console.log('nope');
        // count down 5 seconds then load game
      } else {
        // timer ran out
        noAnswers++;
        // count down 5 secounds then load game
      }
    });
  }
};

const timeForCurrentQuestion = () => {
  console.log('questionTime :', questionTime);
  questionTime--; // decrement time
  $('#time').text('Time Remaining: ' + questionTime + ' Seconds'); // update tet
  if (questionTime === 0) {
    console.log('questionTime hit 0');
    noAnswers++;
    clearInterval(questionInterval); // clear time
    // questionTime = 10; // start time
    console.log('questionTime at 0:', questionTime);
    // loadGame();
    // breakInterval = setInterval(timeNextQuestion, 1000);
  }
};

// const timeNextQuestion = () => {
//   console.log('timeNextQuestion Called | time:', breakTime);
//   breakTime--;
//   if (breakTime === 0) {
//     console.log('breakTime hit 0');
//     clearInterval(breakTime);
//     breakTime = 5;
//     loadGame();
//   }
// };

const init = () => {
  // initialize variables
  correctAnswers = 0;
  incorrectAnswers = 0;
  noAnswers = 0;
  totalQuestions = 0;
  questionTime = 5;
  breakTime = 5;

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
