const talleresDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const rightsTitle = document.querySelector('.rights')
// const createTallerBtn = document.querySelector('.submit-btn')



const showTalleres = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { talleres },
    } = await axios.get('/api/v1/talleres', {headers: {'Authorization': localStorage.getItem('authorization')}})
    if (talleres.length < 1) {
      talleresDOM.innerHTML = '<h5 class="empty-list">No hay talleres</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTalleres = talleres
      .map((taller) => {
        const { _id: tallerId, title, body, createdAt } = taller
        return `<div class="single-task">
<h5><span><i class="far fa-check-circle"></i></span>${title}</h5>
<div class="task-links">



<!-- edit link -->
<a href="taller.html?id=${tallerId}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${tallerId}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    talleresDOM.innerHTML = allTalleres
  } catch (error) {
    console.log(error)
    talleresDOM.innerHTML =
      '<h5 class="empty-list">Error, por favor cargue la pagina de nuevo...</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTalleres()


talleresDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/talleres/${id}`, {headers: {'Authorization': localStorage.getItem('authorization')}})
      showTalleres()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

document.querySelector('.submit-btn').addEventListener('click', () => window.location.href = "crear-taller.html")