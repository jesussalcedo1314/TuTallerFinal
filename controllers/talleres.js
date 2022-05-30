const Taller = require('../models/taller')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTalleres = async (req, res) => {
    console.log(req.body)
    const talleres = await Taller.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: talleres.length, talleres})
}

const getTaller = async (req, res) => {
    const {user: {userId}, params: {id: tallerId}} = req
    const taller = await Taller.findOne({_id: tallerId, createdBy: userId})
    if(!taller){
        throw new NotFoundError(`no hay taller con id ${tallerId}`)
    }
    res.status(StatusCodes.OK).json({taller})
}

const createTaller = async (req, res) => {
    req.body.createdBy = req.user.userId
    const taller = await Taller.create(req.body)
    console.log(taller)
    res.status(StatusCodes.CREATED).json(taller)
}

const updateTaller = async (req, res) => {
    const {body: {title, body, assignedStudents}, user: {userId}, params: {id: tallerId}} = req
    console.log(req.body)
    if(title === '' || body === ''){
        throw new BadRequestError('el cuerpo y/o titulo del taller no puede estar vacio')
    }
    if(assignedStudents){
        const taller = await Taller.findOneAndUpdate({_id: tallerId, createdBy: userId}, {"$push":{"assignedStudents": assignedStudents}}, {new: true, runValidators: true})
        if(!taller){
            throw new NotFoundError(`no se encontro taller con id ${tallerId}`)
        }
        res.status(StatusCodes.OK).json({taller})
    }
    if(!assignedStudents){
        const taller = await Taller.findOneAndUpdate({_id: tallerId, createdBy: userId}, req.body, {new: true, runValidators: true})
        if(!taller){
            throw new NotFoundError(`no se encontro taller con id ${tallerId}`)
        }
        res.status(StatusCodes.OK).json({taller})
    }
}

const deleteTaller = async (req, res) => {
    const {user: {userId}, params: {id: tallerId}} = req
    const taller = await Taller.findByIdAndRemove({_id: tallerId, createdBy: userId})
    if(!taller){
        throw new NotFoundError(`no se encontro taller con id ${tallerId}`)
    }
    res.status(StatusCodes.OK).json({deleted: 'success', tallerId})
}


module.exports = {
    getAllTalleres,
    getTaller,
    createTaller,
    updateTaller,
    deleteTaller
}