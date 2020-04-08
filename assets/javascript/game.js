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

var wordIndex = 0
var wins = 0
var losses = 0
var adder = 0
var guesses = 10
var blanks = []

function createBlanks() {
    blanks = []
    for (var i = 0; i < wordList[wordIndex].char; i++) {
        blanks.push("_")
    }

    // What blanks looks like after the loop:
    // blanks = ["_","_","_","_"]

    blanks.join(" ")

    // What I'm expecting:
    // _ _ _ _

    // What I'm getting:
    // _,_,_,_

    $("#word").text(blanks)
}

function newWord() {
    createBlanks()
    $("#wrongLetters").text("Wrong Letters Guessed: ")
    $("#guesses").text("Guesses Left: " + guesses)
}

function displayScore() {
    $("#wins").text("Wins: " + wins)
    $("#losses").text("Losses: " + losses)
}

function endGame() {
    if (wordIndex >= wordList.length) {
        $("#masterBox").text("Game Over!")
        addStartButton()
    }

    if (guesses === 0) {
        losses++
        wordIndex++
        adder = 0
        guesses = 10
        displayScore()
        newWord()
    }

    if (adder === wordList[wordIndex].sum && guesses !== 0) {
        wins++
        wordIndex++
        adder = 0
        guesses = 10
        displayScore()
        newWord()
    }
}

function addStartButton() {
    $("#word").html("<button id='startGame' type='button' class='btn btn-secondary'>Start Game</button>")
}

var duplicateGuesses = []
var badGuesses = []

function checkChars(keyPress) {
    var goodChar = false
    var corrects = $("#word")
    

    for (var i = 0; i < wordList[wordIndex].char; i++) {
        if (wordList[wordIndex].word[i] === keyPress && blanks.includes(keyPress)) {
            goodChar = false
            // console.log(goodChar)
        } else if (wordList[wordIndex].word[i] === keyPress) {
            goodChar = true
            // console.log(goodChar)
        }
    }

    if (goodChar) {
        for (var j = 0; j < wordList[wordIndex].char; j++) {
            if (wordList[wordIndex].word[j] === keyPress) {
                adder += alphabetScore[keyPress]
                blanks[j] = keyPress
            }
        }
        blanks.join(" ")
        corrects.text(blanks)
        // console.log("Correct: " + blanks)
        endGame()
    } else {
        if (jQuery.inArray(keyPress, duplicateGuesses) === -1){
            $("#guesses").text("Guesses Left: " + guesses--)
            $("#wrongLetters").append(keyPress + " ")
        } else {
            badGuesses.push(keyPress)
            duplicateGuesses.push(keyPress)
            console.log("bad: " + badGuesses)
            console.log("dup from else: " + duplicateGuesses)
        }
        endGame()
    }
}

function startGame() {
    // var keyPress = event.key.toLowerCase()

    displayScore()

    newWord()

    $(document).keydown(function (e) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            var keyPress = e.originalEvent.key
            // console.log(keyPress)
            checkChars(keyPress)
        }
    })
}

// Listeners
$(document).ready(function () {
    addStartButton()

    $("#startGame").on("click", function () {
        startGame()
    })
})

