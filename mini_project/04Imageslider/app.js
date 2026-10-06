const prev = document.querySelector('.prev')
const image = document.querySelector('.image')
const next = document.querySelector('.next')
const counter = document.querySelector('.counter')
const pause = document.querySelector('.pause')
const play = document.querySelector('.play')

const images = [
  'https://picsum.photos/id/10/600/400',
  'https://picsum.photos/id/20/600/400',
  'https://picsum.photos/id/30/600/400',
  'https://picsum.photos/id/40/600/400',
  'https://picsum.photos/id/50/600/400'
]

let currentImage = 0
let timer

next.addEventListener('click', function () {
  currentImage++
  if (currentImage === images.length) {
    currentImage = 0
  }
  showImage()
})
prev.addEventListener('click', function () {
  if (currentImage === 0) {
    currentImage = images.length - 1
  } else {
    currentImage--
  }
  showImage()
})
pause.addEventListener('click', function () {
  clearInterval(timer)
  timer = null
})
play.addEventListener('click', function () {
  if (timer) {
    return
  }
  startAutoSlide()
})

function startAutoSlide () {
  timer = setInterval(() => {
    currentImage++
    if (currentImage === images.length) {
      currentImage = 0
    }
    showImage()
  }, 2000)
}

startAutoSlide()

function showImage () {
  console.log(images[currentImage])
  counter.textContent = currentImage + 1 + ' / ' + images.length
  image.src = images[currentImage]
}

showImage()
