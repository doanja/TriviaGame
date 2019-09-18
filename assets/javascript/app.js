const dict = [];
let chosenAnswer = null;
let correctAnswers, incorrectAnswers, noAnswers;

/*
 *  @param parentElement, the element to append elements to
 */
const renderQuestion = (parentElement, quest) => {
  console.log('renderGame called');
  const time = $('<h3>', { id: 'time' }).text('Time Remaining: XX Seconds');
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

const loadGame = problem => {
  renderQuestion($('#answersWrap'), problem.question);

  // create a mutable copy of problem.answers
  const copyOfAnswers = [...problem.answers];

  for (let i = 0; i < 4; i++) {
    const randomizedAnswer =
      copyOfAnswers[Math.floor(Math.random() * copyOfAnswers.length)]; // grab a random answer
    renderAnswers($('.row'), i, randomizedAnswer); // render a button with the random answer as text

    // attach a click listener to the button and check the answer
    $('#answers-' + i).click(() => {
      // if the answer is correct
      if (randomizedAnswer === problem.answers[0]) {
        correctAnswers++;
        console.log('true');
      }
      // if the answer is incorrect
      else if (randomizedAnswer !== problem.answers[0]) {
        incorrectAnswers++;
        console.log('nope');
      } else {
        // timer ran out
        noAnswers++;
      }
    });
    // remove the answer from the array
    copyOfAnswers.splice(copyOfAnswers.indexOf(randomizedAnswer), 1); // remove the random answer
  }
};

const init = () => {
  // initialize variables
  correctAnswers = 0;
  incorrectAnswers = 0;
  noAnswers = 0;

  $('#startWrap').hide(); // hide start screen

  initDictionary(); // fill the dictionary with triva questions

  loadGame(dict[0]);
};

const initDictionary = () => {
  dict.push(
    {
      question: 'What is the diameter of Earth?',
      answers: ['8,000 miles', '9,300 miles', '7,800 miles', '10,680 miles']
    },
    {
      question:
        'Which famous nurse was known as “The Lady Of The Lamp” during the crimean war?',
      answers: ['Sharks', 'Dolphins', 'Mammals', 'Reptiles']
    },
    {
      question: 'Great Whites and Hammerheads are what type of animals?',
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
