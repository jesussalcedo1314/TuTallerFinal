const express = require('express')
const router = express.Router()

const {
    getAllTalleres,
    getTaller,
    createTaller,
    updateTaller,
    deleteTaller
} = require('../controllers/talleres')

router.route('/').get(getAllTalleres).post(createTaller)
router.route('/:id').get(getTaller).patch(updateTaller).delete(deleteTaller)

module.exports = router