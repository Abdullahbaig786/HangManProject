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
    this.endScreen = document.getElementById("game-end");
    this.gameEndWinner = document.getElementById("game-end-winner");
    this.categoryNames = document.getElementById("catagoryName");
    this.pTag = document.getElementById("pTag");
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
  // select category

  categories() {
    // const words =[...this.words];
    const words = this.words.map((e) => {
      return e.join("");
    });
    let wd = words[words.indexOf(this.word.join(""))];
    if (wd === words[0]) {
      this.categoryNames.innerHTML = "Category: Any institute Name";
    }
    if (wd === words[1]) {
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
      //hangman.src = "Hangman.png";
    }

    //checks if all letters have been found
    var finish = true;
    for (var i = 0; i < this.selectWord.length; i++) {
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
  ["B", "A", "R", "C", "E", "L", "O", "N", "A"],
  ["W", "A", "T", "E", "R"],
  ["L", "A", "N", "D", "S", "C", "A", "P", "E"],
  ["C", "H", "O", "C", "O", "L", "A", "T", "E"],
  ["G", "E", "R", "M", "A", "N", "Y"],
]);
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  console.log("clicked");
  game.start();
});

// Create a new instance of HangmanGame

function init() {
  game.initializeSelectWord();
  game.printSelectWord();
}

window.onload = init;
checkButton.addEventListener("click", function () {
  game.checkLetter();
});
