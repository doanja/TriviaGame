const dict = [];

/*
 *  @param parentElement, the element to append elements to
 */
const renderGame = (parentElement, quest) => {
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

const loadQuestion = (question, answers) => {
  renderGame($('#answersWrap'), question);

  // index 0 in dict[i].answers is always the answer, grab what the user clicked on, compare it to this
  for (let i = 0; i < 4; i++) {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)]; // grab a random answer
    renderAnswers($('.row'), i, randomAnswer); // render a button with the random answer as text
    answers.splice(answers.indexOf(randomAnswer), 1); // remove the random answer
  }
};

const startGame = () => {
  $('#startWrap').hide(); // hide start stuff
  initDictionary(); // fill the dictionary with triva questions
  loadQuestion(dict[0].question, dict[0].answers);

  //   console.log('dict :', dict);
  console.log('dict[0].answers :', dict[0].answers);
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
  $('#play-button').click(startGame);
};
