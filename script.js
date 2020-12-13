const randomUrl = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const timerElement = document.getElementById('timer')
const quoteInputElement = document.getElementById('quoteInput')
let correct = true
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }

    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(randomUrl)
    .then(response=>response.json())
    .then(data=>data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null;
    startTimer()
}


let startTime
function startTimer() {
    timer.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    },1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}


renderNewQuote()