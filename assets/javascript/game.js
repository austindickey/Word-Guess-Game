// All words in the game
var wordList = [
    { word: "bolt", char: 4, sum: 49 },
    { word: "grime", char: 5, sum: 52 },
    { word: "wings", char: 5, sum: 72 },
    { word: "guitar", char: 6, sum: 76 },
    { word: "drifter", char: 7, sum: 80 },
    { word: "bank", char: 4, sum: 28 },
    { word: "onion", char: 5, sum: 67 }
]

// This game will be based of an alphabet score system. If the letters do not add up to the sum, it will be a loss.
var alphabetScore = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
}

// Initializing Variables
var wordIndex = 0
var wins = 0
var losses = 0
var adder = 0
var guesses = 10
var blanks = []
var duplicateGuesses = []

// Restart the game after final word
function restartGame() {
    $("#gameOver").text("Game Over!")
    $("#word").html("<button id='restart' type='button' class='btn btn-secondary'>Restart Game</button>")
    $("#wrongLetters").empty()
    $("#guesses").empty()

    wordIndex = 0
    wins = 0
    losses = 0

    $("#restart").on("click", function () {
        startGame()
    })
}

// Create the blanks for each word
function createBlanks() {
    blanks = []

    if (wordIndex === wordList.length) {
        restartGame()
    } else {
        for (var i = 0; i < wordList[wordIndex].char; i++) {
            blanks.push("_")
        }

        var noCommas = blanks.join(" ")
        $("#word").text(noCommas)
    }

}

// Print all the neccessary text to the screen
function displayScore() {
    $("#gameOver").empty()
    $("#wins").text("Wins: " + wins)
    $("#losses").text("Losses: " + losses)
    $("#wrongLetters").text("Wrong Letters Guessed: ")
    $("#guesses").text("Guesses Left: " + guesses)
}

// Check for wins and losses
function endGame() {
    // Losses
    if (guesses === 0) {
        losses++
        wordIndex++
        adder = 0
        guesses = 10
        displayScore()
        createBlanks()
    }
    // Wins
    if (adder === wordList[wordIndex].sum && guesses !== 0) {
        wins++
        wordIndex++
        adder = 0
        guesses = 10
        displayScore()
        createBlanks()
    } 
}

// Create the start game button
function addStartButton() {
    $("#word").html("<button id='startGame' type='button' class='btn btn-secondary'>Start Game</button>")
}

// Logic for each key press
function checkChars(keyPress) {
    var goodChar = false
    var corrects = $("#word")

    for (var i = 0; i < wordList[wordIndex].char; i++) {
        if (wordList[wordIndex].word[i] === keyPress && blanks.includes(keyPress)) {
            duplicateGuesses.push(keyPress)
            goodChar = false
        } else if (wordList[wordIndex].word[i] === keyPress) {
            goodChar = true
        }
    }

    if (goodChar) {
        for (var j = 0; j < wordList[wordIndex].char; j++) {
            if (wordList[wordIndex].word[j] === keyPress) {
                adder += alphabetScore[keyPress]
                blanks[j] = keyPress
            }
        }
        var noCommas = blanks.join(" ")
        corrects.text(noCommas)
        endGame()
    } else {
        if (jQuery.inArray(keyPress, duplicateGuesses) === -1){
            $("#guesses").text("Guesses Left: " + guesses--)
            $("#wrongLetters").append(keyPress + " ")
            duplicateGuesses.push(keyPress)
        }
        endGame()
    }
}

// Starts the game and listens to every letter pressed
function startGame() {

    displayScore()
    createBlanks()

    $(document).keydown(function (e) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            var keyPress = e.originalEvent.key
            checkChars(keyPress)
        }
    })
}

// Listener for page load and start game button click
$(document).ready(function () {
    addStartButton()

    $("#startGame").on("click", function () {
        startGame()
    })
})