const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const getAllEstudiantes = async (req, res) => {
    const estudiantes = await User.find({rights: 'estudiante'}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: estudiantes.length, estudiantes})
}

const getAllProfesores = async (req, res) => {
    const profesores = await User.find({rights: 'profesor'}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: profesores.length, profesores})
}

module.exports = {
    getAllEstudiantes,
    getAllProfesores
}