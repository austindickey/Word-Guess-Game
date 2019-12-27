var wordlist = [
    { w: "bolt", char: 4, guesses: 7 },
    { w: "grime", char: 5, guesses: 9 },
    { w: "wings", char: 5, guesses: 9 },
    { w: "guitar", char: 6, guesses: 11 },
    { w: "drifter", char: 7, guesses: 13 },
    { w: "bank", char: 4, guesses: 7 },
    { w: "onion", char: 5, guesses: 9 },
]

var wordIndex = 0;
var wins = 0;
var losses = 0;

function provideWord() {
    if (wordIndex < wordlist.length) {
        console.log(wordlist[wordIndex].w);
    }
    else {
        console.log("Game Over!");
    }
}

document.onkeyup = function (event) {
    var keyPress = event.key.toLowerCase();

    if (wordIndex === wordlist.length) {
        return;
    }

    if (keyPress === "a" || keyPress === "b" || keyPress === "c" || keyPress === "d" || keyPress === "e" || keyPress === "f" || keyPress === "g" || keyPress === "h" || keyPress === "i" || keyPress === "j" || keyPress === "k" || keyPress === "l" || keyPress === "m" || keyPress === "n" || keyPress === "o" || keyPress === "p" || keyPress === "q" || keyPress === "r" || keyPress === "s" || keyPress === "t" || keyPress === "u" || keyPress === "v" || keyPress === "w" || keyPress === "x" || keyPress === "y" || keyPress === "z") {
        wordlist[wordIndex].guesses--;
        console.log(wordlist[wordIndex].guesses) 
        if (wordlist[wordIndex].guesses === 0) {
            losses++;
            console.log("Losses: " + losses);
            wordIndex++;
            provideWord();
            console.log("New word: " + wordlist[wordIndex].w);
        }
    }

    for (var i = 0; i < wordlist[wordIndex].char; i++) {
        if (keyPress === wordlist[wordIndex].w[i]) {
            console.log("true")
            return;
        }
    }

}