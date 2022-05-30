const formDOM = document.querySelector('.login-form')
const formAlertDOM = document.querySelector('.form-alert')


formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()

  const nombre = document.querySelector('.input-nombre').value
  const email = document.querySelector('.input-email').value
  const password = document.querySelector('.input-password').value
  const studentChecker = document.querySelector('.student-checker').checked ? 'estudiante' : 'profesor'

  try {

    const request = axios.post('/api/v1/auth/register', { name: nombre, email: email, password: password, rights: studentChecker })
    request.then((response) => {
      console.log('registered')
    })
    window.location.href = "login.html"
  } catch (error) {
    console.log(error)
  }
})
