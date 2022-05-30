const express = require('express')
const router = express.Router()

const {
    getAllEstudiantes,
    getAllProfesores
} = require('../controllers/users')

router.route('/estudiantes').get(getAllEstudiantes)
router.route('/profesores').get(getAllProfesores)

module.exports = router