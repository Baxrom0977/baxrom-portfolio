const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
const days = document.querySelector('.days')
const monthYear = document.querySelector('.monthYear')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

let date = new Date()

let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()

function renderCalendar () {
  days.innerHTML = ''
  const today = new Date()
  let daysInMonth = new Date(year, month + 1, 0).getDate()
  let firstDay = new Date(year, month, 1).getDay()

  monthYear.textContent = months[month] + ' ' + year
  if (firstDay === 0) {
    firstDay = 6
  } else {
    firstDay--
  }
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div')
    days.append(emptyDay)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div')
    dayElement.textContent = i
    if ( i === today.getDate() && month === today.getMonth() &&year === today.getFullYear()) {
      dayElement.classList.add('today')
    }

    days.append(dayElement)
  }
}
renderCalendar()

nextBtn.addEventListener('click', function () {
  if (month === 11) {
    month = 0
    year++
  } else {
    month++
  }

  renderCalendar()
})
prevBtn.addEventListener('click', function () {
  if (month === 0) {
    month = 11
    year--
  } else {
    month--
  }
  renderCalendar()
})
