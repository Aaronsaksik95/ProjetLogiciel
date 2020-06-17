const express = require('express');
const router = express.Router();
const avancement = require('../models').Avancement;
const { Op } = require("sequelize");


router.get('/:UserId', function (req, res) {
    avancement.findAll({ where: { UserId: req.params.UserId } })
        .then(niveau => {
            res.status(200).json(niveau)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
router.get('/max/:UserId', function (req, res) {
    avancement.max('NiveauId',{ where: { UserId: req.params.UserId } })
        .then(niveau => {
            res.status(200).json(niveau+1)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/sum/:UserId', function (req, res) {
    avancement.sum('score',{ where: { UserId: req.params.UserId } })
        .then(niveau => {
            res.status(200).json(niveau)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


router.get('/:UserId/:NiveauId', async function (req, res) {
    avancUser = await avancement.findOne({ where: { UserId: req.params.UserId, NiveauId: req.params.NiveauId } })
        .then(avancUser => {
            res.status(200).json(avancUser)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', async function (req, res) {
    const sameAvanc = await avancement.findOne({ where: { UserId: req.body.UserId, NiveauId: req.body.NiveauId } });

    if (sameAvanc === null) {
        avancement.create({
            NiveauId: req.body.NiveauId,
            UserId: req.body.UserId,
            score: req.body.score
        })
    }

})

router.delete('/:id', async function (req, res) {
    avancement.destroy({
        where: {
            UserId: req.params.id
        }
    })
})


module.exports = router;
