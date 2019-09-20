# TriviaGame

This is a trivia game using JavaScript for the logic and jQuery to manipulate HTML. The layout of this app uses bootstrap.

### Expected Usage

- Clicking "Play Game" the app will randomly select a question from the data.js file to retrieve a problem that contains a question and four possible answers and randomizes the answers.
- The player will have 30 seconds to answer each question and 5 seconds before the next question is loaded.

  - There are 3 constant values that can modified to change the pacing of the game or the number of questions asked:
  - MAX_QUESTION_TIME for the time the player has for each question.
  - MAX_BREAK_TIME for the time the player has after each question.
  - MAX_QUESTIONS_ASKED for the number of questions asked.

- More questions can be added to data.js.
- The game keeps track of the number of correct answers, the number of incorrect answers, and the number of unanswered questions. Correct questions are always stored in the first index of the answers array of the problem.
- After the qstnCounter reaches the MAX_QUESTIONS_ASKED the player will be presented with the end game screen that displays the results of the trivia game and they can press "Play Again" to start over.

### Live Demo

- https://doanja.github.io/TriviaGame/

### Download and Play Locally

1. Clone the repository "https://github.com/doanja/TriviaGame.git" to your PC.

2. Open index.html in your web browser to start playing.

# License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).
