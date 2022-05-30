const mongoose = require('mongoose')

const tallerSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Cada taller debe tener un nombre'],
        maxlength: 100,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide an user']
    },
    body:{
        type: String,
        required: [true, 'El cuerpo del taller no puede estar vacio']
    },
    assignedStudents:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

module.exports = mongoose.model('Taller', tallerSchema)