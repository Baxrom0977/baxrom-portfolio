const guessInput = document.querySelector('.guessInput')
const guessBtn = document.querySelector('.guessBtn')
const message = document.querySelector('.message')
const attempts = document.querySelector('.attempts')
const resetBtn = document.querySelector('.resetBtn')

let number
let attemptsCount = 0

guessBtn.addEventListener('click', function () {
  if (guessInput.value === '') {
    message.textContent = 'Введите число!'
    return
  }
  let guessInputInfo = Number(guessInput.value)
  if (guessInputInfo > 100 || guessInputInfo < 1) {
    message.textContent = 'Вы ввели больше 100 ili Вы ввели меньше 1'
    return
  }
  attemptsCount++
  attempts.textContent = attemptsCount

  if (guessInputInfo > number) {
    message.textContent = 'Вы ввели больше'
  } else if (guessInputInfo < number) {
    message.textContent = 'Вы ввели меньше'
  } else {
    message.textContent = '🎉 Вы угадали!'
    guessBtn.disabled = true
  }

  console.log(guessInputInfo)
  guessInput.value = ''
})
resetBtn.addEventListener('click', function () {
  getRandom(1, 100)
  guessBtn.disabled = false
  message.textContent = 'Start guessing!'

  attemptsCount = 0
  attempts.textContent = attemptsCount

  guessInput.value = ''
})

function getRandom (min, max) {
  number = Math.floor(Math.random() * (max - min + 1) + min)
}

getRandom(1, 100)
console.log(number)
