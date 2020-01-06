/* It pains me to say, but for once, I have to allow myself to submit something incomplete; 
due to my extenuating travel circumstances. This should be the 1 and only time this happens. */

var wordList = [
    { word: "bolt", char: 4, guesses: 7, sum: 49 },
    { word: "grime", char: 5, guesses: 9, sum: 52 },
    { word: "wings", char: 5, guesses: 9, sum: 72 },
    { word: "guitar", char: 6, guesses: 11, sum: 76 },
    { word: "drifter", char: 7, guesses: 13, sum: 80 },
    { word: "bank", char: 4, guesses: 7, sum: 28 },
    { word: "onion", char: 5, guesses: 9, sum: 67 }
]

// This game will be based of an alphabet score system. If the letters do not add up to the sum, it will be a loss.
var alphabetScore = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
}

var wordIndex = 0
var wins = 0
var losses = 0
var adder = 0

function endGame() {
    if (wordIndex >= wordList.length) {
        document.querySelector("#masterBox").innerHTML = "Game Over!"
        return
    }
}

function clearContent() {
    document.querySelector("#word").innerHTML = "Correct letters guessed: ";
}

document.onkeyup = function (event) {
    var keyPress = event.key.toLowerCase()
    var corrects = document.querySelector("#word");

    if (wordIndex === wordList.length) {
        return
    }

    document.querySelector("#wins").innerHTML = "Wins: " + wins
    document.querySelector("#losses").innerHTML = "Losses: " + losses
    document.querySelector("#characters").innerHTML = "Number of letters in word: " + wordList[wordIndex].char

    if (keyPress === "a" || keyPress === "b" || keyPress === "c" || keyPress === "d" || keyPress === "e" || keyPress === "f" || keyPress === "g" || keyPress === "h" || keyPress === "i" || keyPress === "j" || keyPress === "k" || keyPress === "l" || keyPress === "m" || keyPress === "n" || keyPress === "o" || keyPress === "p" || keyPress === "q" || keyPress === "r" || keyPress === "s" || keyPress === "t" || keyPress === "u" || keyPress === "v" || keyPress === "w" || keyPress === "x" || keyPress === "y" || keyPress === "z") {
        wordList[wordIndex].guesses--
        // add in if statement for if keyPress has already been pressed, don't remove a guess from the user again -- not done
        document.querySelector("#guesses").innerHTML = "Guesses Left: " + wordList[wordIndex].guesses
        if (wordList[wordIndex].guesses === 0) {
            losses++
            wordIndex++
            adder = 0
            clearContent()
            endGame()
        }

        // There might be something wrong with the below statement in the scenario that all the letters have been guessed but the .guesses is still not at 0
        if (adder === wordList[wordIndex].sum && wordList[wordIndex].guesses !== 0 || adder === wordList[wordIndex].sum && wordList[wordIndex].guesses === 0 ) {
            wins++
            wordIndex++
            adder = 0
            clearContent()
            endGame()
        }
    }

    else {
        alert("Invalid key was pressed")
    }

    for (var i = 0; i < wordList[wordIndex].char; i++) {
        if (keyPress === wordList[wordIndex].word[i]) {
            corrects.textContent += keyPress;
            adder += alphabetScore[keyPress]
            return
        }
        // I can't figure out how to tell it if keypress has already been pressed once in this cycle, don't print or calculate it

    }

}