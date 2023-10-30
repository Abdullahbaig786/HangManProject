class HangmanGame {
  constructor(words) {
    this.words = words;
    this.random = Math.floor(Math.random() * (this.words.length - 1));
    this.word = this.words[this.random];
    this.selectWord = new Array(this.word.length);
    this.counter = 0;
    //screen
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end"); //game over loser screens
    this.gameEndWinner = document.getElementById("game-end-winner");
    this.categoryNames = document.getElementById("catagoryName");
  }

  // Word length Dashes print
  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.initializeSelectWord();
  }
  //LOSER
  end() {
    this.gameScreen.style.display = "none";
    this.startScreen.style.display = "none";
    this.endScreen.style.display = "block";
  }
  //WINNER
  gameWinner() {
    this.gameScreen.style.display = "none";
    this.startScreen.style.display = "none";
    this.gameEndWinner.style.display = "block";
  }
  //Check word length and count dashes
  initializeSelectWord() {
    for (let i = 0; i < this.selectWord.length; i++) {
      this.selectWord[i] = "_ ";
    }
  }

  // Print the selectWord array into dashes element
  printSelectWord() {
    for (let i = 0; i < this.selectWord.length; i++) {
      let con = document.getElementById("dashes");
      let pop = document.createTextNode(this.selectWord[i]);
      con.appendChild(pop); //append pop inside the con
    }
    //console.log(this.word);
  }

  // select category
  categories() {
    const words = this.words.map((e) => {
      return e.join("");
    });
    //words has array of words
    let wd = words[words.indexOf(this.word.join(""))]; //
    if (wd === words[0]) {
      this.categoryNames.innerHTML = "Category: Any institute Name";
    } else if (wd === words[1]) {
      this.categoryNames.innerHTML = "Cteogary: City Name";
    } else if (wd === words[2]) {
      this.categoryNames.innerHTML = "Cateogary: Drink";
    } else if (wd === words[3]) {
      this.categoryNames.innerHTML = "Cateogary: Nature";
    } else if (wd === words[4]) {
      this.categoryNames.innerHTML = "Cateogary: Food";
    } else if (wd === words[5]) {
      this.categoryNames.innerHTML = "Cateogary: Country";
    }
  }

  // Check if the guessed letter matches one or more letters in the word
  checkLetter() {
    this.categories();
    let f = document.rateformular; //Parent Form
    let b = f.elements["sign"]; // take all the elements of sign id
    let sign = b.value; // inside the sign alphabet provided by the user
    sign = sign.toUpperCase();
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === sign) {
        this.selectWord[i] = sign + " ";
        var count = true;
      }
      b.value = "";
    }

    //deletes the old dashes of word and replaces it with the new one
    let con = document.getElementById("dashes");
    con.innerHTML = "";
    this.printSelectWord();

    // if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list
    if (!count) {
      let generateLetter = document.getElementById("generateLetter"); //Wrong letters
      let letter = document.createTextNode(" " + sign);
      generateLetter.appendChild(letter);
      this.counter++;
      // let hangman = document.getElementById("hangman");
      //hangman.src = "Hangman.png";
    }

    //checks if all letters have been found
    let finish = true;
    for (let i = 0; i < this.selectWord.length; i++) {
      if (this.selectWord[i] === "_ ") {
        finish = false;
      }
    }
    //Third Screen
    if (finish) {
      // window.alert("You win!");
      this.gameWinner();
    }

    //once you got six wrong letters, you lose
    if (this.counter === 6) {
      // window.alert("Uh...I guess you're dead now.");
      this.end();
    }
  }
}
let checkButton = document.getElementById("ratebutton");

const game = new HangmanGame([
  ["I", "R", "O", "N", "H", "A", "C", "K"],
  ["B", "E", "R", "L", "I", "N"],
  ["W", "A", "T", "E", "R"],
  ["M", "O", "U", "N", "T", "A", "I", "N", "S"],
  ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
  ["G", "E", "R", "M", "A", "N", "Y"],
]);
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  game.start();
});

// Create a new instance of HangmanGame

function init() {
  game.initializeSelectWord();
  game.printSelectWord();
}
// Run when entire webpage  have finished loading
window.onload = init;
checkButton.addEventListener("click", function () {
  game.checkLetter();
});
