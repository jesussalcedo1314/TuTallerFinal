const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.taller-title')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const tallerTitle = document.querySelector('.task-edit-name')
const tallerBody = document.querySelector('.task-edit-body')
const possibleStudents = document.querySelector('.possible-students')
const params = window.location.search


editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Cargando...'
  e.preventDefault()
  try {
    const newTitle = tallerTitle.value
    const newBody = tallerBody.value

    const {
      data: { taller },
    } = await axios.post('/api/v1/talleres', {
      title: newTitle,
      body: newBody
    }, {headers: {'Authorization': localStorage.getItem('authorization')}})

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'taller creado exitosamente'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, intente de nuevo`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
    window.location.href = "index.html"
  }, 1000)
})