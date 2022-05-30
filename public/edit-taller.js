const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.taller-title')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const tallerBody = document.querySelector('.task-edit-name')
const possibleStudents = document.querySelector('.possible-students')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTaller = async () => {
  try {
    const {
      data: { taller },
    } = await axios.get(`/api/v1/talleres/${id}`, {headers: {'Authorization': localStorage.getItem('authorization')}})
    const { _id: tallerId, title, body } = taller

    taskIDDOM.textContent = tallerId
    taskNameDOM.textContent = title
    tallerBody.value = body
    tempName = title
  } catch (error) {
    console.log(error)
  }
}

const showPossibleStudents = async () => {
  try{
    const {
      data: { estudiantes }
    } = await axios.get('/api/v1/users/estudiantes' , {headers: {'Authorization': localStorage.getItem('authorization')}})
    const allEstudiantes = estudiantes
      .map((estudiante) => {
        const { _id: userId, name } = estudiante
        return `<div class="possible-students"><a class="possible-student" href="#" id="${userId}">${name}</a></div>`
      }).join('')
      possibleStudents.innerHTML = allEstudiantes
  } catch(error){
    console.log(error)
  }
}

showTaller()
showPossibleStudents()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Cargando...'
  e.preventDefault()
  try {
    const tallerName = taskNameDOM.textContent
    const newBody = tallerBody.value

    const {
      data: { taller },
    } = await axios.patch(`/api/v1/talleres/${id}`, {
      title: tallerName,
      body: newBody
    }, {headers: {'Authorization': localStorage.getItem('authorization')}})

    const { _id: taskID, completed, name } = taller

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = 'taller editado exitosamente'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, intente de nuevo`
  }
  editBtnDOM.textContent = 'Editar'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

document.querySelector('.possible-students').addEventListener('click', async (e) => {
  const el = e.target
  console.log(el)
  e.preventDefault()
  const assignToId = el.id
  console.log(assignToId)
  try {
    const tallerName = taskNameDOM.textContent
    const newBody = tallerBody.value

    const {
      data: { taller },
    } = await axios.patch(`/api/v1/talleres/${id}`, {
      title: tallerName,
      body: newBody,
      assignedStudents: assignToId
    }, {headers: {'Authorization': localStorage.getItem('authorization')}})
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, intente de nuevo`
  }
})
