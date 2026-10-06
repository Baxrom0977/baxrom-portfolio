//const received = document.querySelector('.received')
//const sent = document.querySelector('.sent')
const botAnswers = [
  'Salom ! 👋',
  'Qalesan?',
  'Judayam qiziqarli 😄',
  'Gaprur 👀',
  'Yaxshi!',
  'Nma qvosan!',
  'Nma gapla!',
  'Qatasan !',
  'Ishlarin yaxshimi!',
  'Qachon kelasan !',
  'Yaxshi raxmat!',
  'Manam yaxshi yurbman !',
  
]

const messageInput = document.querySelector('.messageInput')
const sendBtn = document.querySelector('.sendBtn')
const messages = document.querySelector('.messages')

sendBtn.addEventListener('click', function () {
  sendMessage()
})
messageInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage()
  }
})
let randomNumber = 0
function getRandom (min, max) {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
}
function sendMessage () {
  getRandom(0, botAnswers.length - 1)

  const now = new Date()
  let time =
    now.getHours().toString().padStart(2, '0') +
    ':' +
    now.getMinutes().toString().padStart(2, '0')
  console.log(time)

  let messageInfo = messageInput.value.trim()

  if (messageInfo === '') {
    return
  }
  let span = document.createElement('span')
  let spanBot = document.createElement('span')
  span.classList.add('time')
  spanBot.classList.add('time')
  span.textContent = time

  let message = document.createElement('p')
  message.classList = 'message sent '
  message.textContent = messageInfo
  message.append(span)

  let messageBot = document.createElement('p')
  messageBot.classList = 'message received '
  messages.append(message)

  let typing = document.createElement('p')
  typing.textContent = 'Bot is typing...'
  typing.classList.add('typing')
  messages.append(typing)

  setTimeout(() => {
    typing.remove()
    messageBot.textContent = botAnswers[randomNumber]

    spanBot.textContent = time

    messages.append(messageBot)
    messageBot.append(spanBot)
    messages.scrollTop = messages.scrollHeight
  }, 1000)

  messageInput.value = ''
  messages.scrollTop = messages.scrollHeight
}
