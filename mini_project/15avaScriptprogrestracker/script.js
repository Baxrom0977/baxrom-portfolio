const projectInput = document.querySelector('.projectInput')
const addBtn = document.querySelector('.addBtn')
const projectList = document.querySelector('.projectList')
const total = document.querySelector('.total')
const progress = document.querySelector('.progress')
const done = document.querySelector('.done')
const notStarted = document.querySelector('.notStarted')
const percent = document.querySelector('.percent')
const progressFill = document.querySelector('.progressFill')

let projects = []

let savedProjects = localStorage.getItem('projects')

if (savedProjects !== null) {
  projects = JSON.parse(savedProjects)
}

addBtn.addEventListener('click', function () {
  let projectInfo = projectInput.value.trim()

  if (projectInfo === '') {
    alert('vvedite nazvanie')
    return
  }

  let newProject = {
    name: projectInfo,
    status: 0
  }

  projects.push(newProject)

  localStorage.setItem('projects', JSON.stringify(projects))

  createProject(newProject)

  projectInput.value = ''
  updateNumber()
  updateStats()
})

function updateNumber () {
  for (let i = 0; i < projectList.children.length; i++) {
    let project = projectList.children[i]
    let projectName = project.querySelector('.projectName')

    projectName.textContent = i + 1 + '. ' + projectName.dataset.name
  }
}

function createProject (projectInfo) {
  let project = document.createElement('div')
  project.classList.add('project')
  projectList.append(project)

  const projectName = document.createElement('span')
  projectName.classList.add('projectName')
  projectName.textContent = projectInfo.name
  projectName.dataset.name = projectInfo.name
  project.append(projectName)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList = 'deleteBtn'
  deleteBtn.textContent = 'Delete'
  project.append(deleteBtn)

  deleteBtn.addEventListener('click', function () {
    project.remove()

    projects = projects.filter(function (item) {
      return item !== projectInfo
    })
    localStorage.setItem('projects', JSON.stringify(projects))
    updateNumber()
    updateStats()
  })

  const statusBtn = document.createElement('button')
  statusBtn.classList = 'statusBtn'
  statusBtn.textContent = 'Не прошли'
  project.append(statusBtn)

  let status = projectInfo.status
  if (status === 1) {
    statusBtn.textContent = 'В процессе'
    statusBtn.style.background = 'yellow'
  }

  if (status === 2) {
    statusBtn.textContent = 'Сделан'
    statusBtn.style.background = 'green'
  }

  statusBtn.addEventListener('click', function () {
    status++

    if (status === 1) {
      statusBtn.textContent = 'В процессе'
      statusBtn.style.background = 'yellow'
    }
    if (status === 2) {
      statusBtn.textContent = 'Сделан'
      statusBtn.style.background = 'green'
    }
    if (status === 3) {
      status = 0
      statusBtn.textContent = 'Не прошли'
      statusBtn.style.background = 'red'
    }
    projectInfo.status = status
    localStorage.setItem('projects', JSON.stringify(projects))
    updateNumber()
    updateStats()
  })
}

projects.forEach(function (projectInfo) {
  createProject(projectInfo)
})

function updateStats () {
  let totalCount = 0
  let progressCount = 0
  let doneCount = 0
  let notStartedCount = 0
  let percentCount = 0

  for (let i = 0; i < projects.length; i++) {
    totalCount++
    if (projects[i].status === 0) {
      notStartedCount++
    }
    if (projects[i].status === 1) {
      progressCount++
    }
    if (projects[i].status === 2) {
      doneCount++
    }
  }

  if (totalCount > 0) {
    percentCount = Math.round((doneCount / totalCount) * 100)
  }

  total.textContent = 'Всего: ' + totalCount
  progress.textContent = 'В процессе: ' + progressCount
  done.textContent = 'Сделано: ' + doneCount
  notStarted.textContent = 'Не прошли: ' + notStartedCount
  percent.textContent = 'Прогресс: ' + percentCount + '%'
  progressFill.style.width = percentCount + '%'
  if (percentCount < 30) {
    progressFill.style.background = 'red'
  } else if (percentCount < 70) {
    progressFill.style.background = 'gold'
  } else if (percentCount <= 100) {
    progressFill.style.background = '#22c55e'
  }
}

updateStats()
