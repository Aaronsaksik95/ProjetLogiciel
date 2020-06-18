const express = require('express');
const router = express.Router();
const audio = require('../models').Audio;
const { Op } = require("sequelize");


router.get('/:UserId', function (req, res) {
    audio.findOne({ where: { UserId: req.params.UserId } })
        .then(audio => {
            res.status(200).json(audio)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/', async function (req, res) {
    const sameAudio = await audio.findOne({ where: { UserId: req.body.UserId } });

    if (sameAudio === null) {
        audio.create({
            son: req.body.son,
            music: req.body.music,
            UserId: req.body.UserId
        })
    }

})
router.put('/:UserId', async function (req, res) {
    audio.update({
        son: req.body.son,
        music: req.body.music
    }, {
        where: {
            UserId: req.params.UserId
        }
    })
})
router.delete('/:id', async function (req, res) {
    audio.destroy({
        where: {
            UserId: req.params.id
        }
    })
})

module.exports = router;
