// class Game {
//   constructor() {
//     this.alphabets = [
//       "a",
//       "b",
//       "c",
//       "d",
//       "e",
//       "f",
//       "g",
//       "h",
//       "i",
//       "j",
//       "k",
//       "l",
//       "m",
//       "n",
//       "o",
//       "p",
//       "q",
//       "r",
//       "s",
//       "t",
//       "u",
//       "v",
//       "w",
//       "x",
//       "y",
//       "z",
//     ];
//     this.words = ["hangman", "javascript", "programming", "openai", "game"];
//     this.startScreen = document.getElementById("game-intro");
//     this.gameScreen = document.getElementById("game-screen");
//     this.gameEnd = document.getElementById("game-end");
//     this.categories = this.categories; // Array of topics
//     this.getHint = this.getHint; // Word getHint
//     this.chosenCategory = this.chosenCategory; // Selected catagory
//     this.word = this.word; // Selected word
//     this.guess = this.guess; // Geuss
//     this.geusses = []; // Stored geusses
//     this.lives = 3; // Lives
//     this.counter = this.counter; // Count correct geusses
//     this.space; // Number of spaces in word '-'
//   }

//   start() {
//     this.startScreen.style.display = "none";
//     this.gameScreen.style.display = "block";
//     this.appendAlphabet();
//   }
//   //Alphabets display
//   appendAlphabet() {
//     const alphabetParentElement = document.getElementById("alphabets");
//     for (let i = 0; i < this.alphabets.length; i++) {
//       const alphabetElement = document.createElement("button");
//       alphabetElement.innerHTML = this.alphabets[i];
//       alphabetParentElement.appendChild(alphabetElement);
//     }
//   }
//   //Select Cateogary
//   selectCatagory() {
//     if (this.chosenCategory === this.categories[0]) {
//       categoryName.innerHTML = "This is A category";
//     } else if (this.chosenCategory === this.categories[1]) {
//       categoryName.innerHTML = "This is B category";
//     } else if (this.chosenCategory === this.categories[2]) {
//       categoryName.innerHTML = "This is C category";
//     } else if (this.chosenCategory === this.categories[3]) {
//       categoryName.innerHTML = "This is D category";
//     }
//   }
//   // Create Guesses
//   createGuess() {
//     const wordHold = document.getElementById("hold");
//     const correct = document.createElement("ul");
//     for (let i = 0; i < this.word.length; i++) {
//       correct.setAttribute("id", "my-word");
//       this.guess = document.createElement("li");
//       this.guess.setAttribute("class", "guess");
//       if (this.word[i] === "-") {
//         this.guess.innerHTML = "-";
//         space = 1;
//       } else {
//         this.guess.innerHTML = "_";
//       }
//       this.geusses.push(this.guess);
//       wordHold.appendChild(correct);
//       correct.appendChild(this.guess);
//     }
//   }

//   //Show Lives
//   showLives() {
//     const getLives = document.getElementById("lives");
//     showLives.innerHTML = "Total Lives Remaining" + this.lives;
//     if (this.lives < 1) {
//       showLives.innerHTML = "Game Over";
//     } else {
//       this.showLives.innerHTML = "You Win";
//     }
//   }
// }
// const game = new Game();
// const startButton = document.getElementById("start-button");

// startButton.onclick = function () {
//   console.log("clicked");
//   game.start();
// };

// startButton.addEventListener("click", () => {
//   console.log("clicked");
//   game.start();
// });

// HangmanGame class
class HangmanGame {
  constructor(words) {
    this.alphabets = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    this.words = words;
    this.random = Math.floor(Math.random() * (this.words.length - 1));
    this.word = this.words[this.random];
    this.selectWord = new Array(this.word.length);
    this.counter = 0;
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
  }

  // Word length Dashes print
  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.initializeSelectWord();
  }
  initializeSelectWord() {
    for (let i = 0; i < this.selectWord.length; i++) {
      this.selectWord[i] = "_ ";
    }
  }

  // Print the selectWord array to the dashes element
  printSelectWord() {
    for (var i = 0; i < this.selectWord.length; i++) {
      var con = document.getElementById("dashes");
      var pop = document.createTextNode(this.selectWord[i]);
      con.appendChild(pop);
    }
  }

  // Check if the guessed letter matches one or more letters in the word
  checkLetter() {
    // console.log("calling function");
    var f = document.rateformular;
    var b = f.elements["sign"]; // elements.[id] means u can get the form id like this
    var sign = b.value; // the letter provided by the user
    sign = sign.toUpperCase();
    for (var i = 0; i < this.word.length; i++) {
      if (this.word[i] === sign) {
        this.selectWord[i] = sign + " ";
        var count = true;
      }
      b.value = "";
    }

    //deletes the guessfield and replaces it with the new one
    var con = document.getElementById("dashes");
    con.innerHTML = "";
    this.printSelectWord();

    // if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list
    if (!count) {
      var generateLetter = document.getElementById("generateLetter");
      var letter = document.createTextNode(" " + sign);
      generateLetter.appendChild(letter);
      this.counter++;
      var hangman = document.getElementById("hangman");
      hangman.src = "Hangman.png" + this.counter + ".png";
    }

    //checks if all letters have been found
    var finish = true;
    for (var i = 0; i < this.selectWord.length; i++) {
      if (this.selectWord[i] === "_ ") {
        finish = false;
      }
    }
    if (finish) {
      window.alert("You win!");
    }

    //once you got six wrong letters, you lose
    if (this.counter === 6) {
      window.alert("Uh...I guess you're dead now.");
    }
  }
}
const game = new HangmanGame();
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  console.log("clicked");
  game.start();
});

// Create a new instance of HangmanGame
const hangmanGame = new HangmanGame([
  ["I", "R", "O", "N", "H", "A", "C", "K"],
  ["B", "A", "R", "C", "E", "L", "O", "N", "A"],
  ["W", "A", "T", "E", "R"],
  ["E", "D", "U", "C", "A", "T", "I", "O", "N"],
  ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
  ["G", "E", "R", "M", "A", "N", "Y"],
]);

function init() {
  hangmanGame.initializeSelectWord();
  hangmanGame.printSelectWord();
}

window.onload = init;

checkButton.addEventListener("click", function () {
  hangmanGame.checkLetter();
});
