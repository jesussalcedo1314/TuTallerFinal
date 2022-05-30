const formDOM = document.querySelector('.login-form')
const formAlertDOM = document.querySelector('.form-alert')

localStorage.setItem('authorization', '')


formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('.input-email').value
  const password = document.querySelector('.input-password').value

  try {

    const request = axios.post('/api/v1/auth/login', { email: email, password: password })
    request.then((response) => {
      localStorage.setItem('authorization', `Bearer ${response.data.token}`)
      console.log(localStorage.getItem('authorization'))
    })
    setTimeout(() => window.location.href = "index.html", 897)
    
  } catch (error) {
    console.log(error)
  }
})
