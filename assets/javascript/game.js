var wordList = [
    { w: "bolt", char: 4, guesses: 7 },
    { w: "grime", char: 5, guesses: 9 },
    { w: "wings", char: 5, guesses: 9 },
    { w: "guitar", char: 6, guesses: 11 },
    { w: "drifter", char: 7, guesses: 13 },
    { w: "bank", char: 4, guesses: 7 },
    { w: "onion", char: 5, guesses: 9 }
]

var wordListBlanks = [
    { w: "____"},
    { w: "_____"},
    { w: "_____"},
    { w: "______"},
    { w: "_______"},
    { w: "____"},
    { w: "_____"}
]

var wordIndex = 0;
var wins = 0;
var losses = 0;

function endGame() {
    if (wordIndex >= wordList.length) {
        document.querySelector("#masterBox").innerHTML = "Game Over!"
        return
    }
}

document.onkeyup = function (event) {
    var keyPress = event.key.toLowerCase()

    if (wordIndex === wordList.length) {
        return
    }

    if (keyPress === "a" || keyPress === "b" || keyPress === "c" || keyPress === "d" || keyPress === "e" || keyPress === "f" || keyPress === "g" || keyPress === "h" || keyPress === "i" || keyPress === "j" || keyPress === "k" || keyPress === "l" || keyPress === "m" || keyPress === "n" || keyPress === "o" || keyPress === "p" || keyPress === "q" || keyPress === "r" || keyPress === "s" || keyPress === "t" || keyPress === "u" || keyPress === "v" || keyPress === "w" || keyPress === "x" || keyPress === "y" || keyPress === "z") {
        wordList[wordIndex].guesses--
        document.querySelector("#guesses").innerHTML = "Guesses Left: " + wordList[wordIndex].guesses
        if (wordList[wordIndex].guesses === 0) {
            losses++
            document.querySelector("#losses").innerHTML = "Losses: " + losses
            wordIndex++
            endGame()
            document.querySelector("#word").innerHTML = "New word: " + wordList[wordIndex].w
        }
    }

    else {
        alert("Invalid key was pressed")
    }

    for (var i = 0; i < wordList[wordIndex].char; i++) {
        if (keyPress === wordList[wordIndex].w[i]) {
            //replace underscores with the correct letter; still not working as expected
             wordListBlanks[wordIndex].w[i] === wordList[wordIndex].w[i]
            console.log(wordListBlanks[wordIndex].w)
            return
        }
    }

}