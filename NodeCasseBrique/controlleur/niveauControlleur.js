const express = require('express');
const router = express.Router();
const niveau = require('../models').Niveau;
var passport = require('passport');
const { Op } = require("sequelize");

require('../authentification/passport_config');


router.get('/all', function (req, res) {
    niveau.findAll({ where: { id: { [Op.not]: 1 } } })
        .then(niveau => {
            res.status(200).json(niveau)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:id', async function (req, res) {
    oneNiveau = await niveau.findOne({ where: { id: req.params.id } })
        .then(oneNiveau => {
            res.status(200).json(oneNiveau)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/', function (req, res) {
    niveau.max('id')
        .then(niveauMax => {
            res.status(200).json(niveauMax)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/', async function (req, res) {
    if (req.body.vitesse) {
        niveau.create({
            colorMain: req.body.colorMain,
            color1: req.body.color1,
            color2: req.body.color2,
            color3: req.body.color3,
            vitesse: req.body.vitesse,
            paddle: req.body.paddle,
            rowBlock: req.body.rowBlock,
            columnBlock: req.body.columnBlock,
            balle: req.body.balle,
            strongBlock: req.body.strongBlock
        }),
            res.json('Niveau bien ajouté')
    }
})

router.put('/:id', async function (req, res) {
    niveau.update({
        colorMain: req.body.colorMain,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        vitesse: req.body.vitesse,
        paddle: req.body.paddle,
        rowBlock: req.body.rowBlock,
        columnBlock: req.body.columnBlock,
        balle: req.body.balle,
        strongBlock: req.body.strongBlock
    }, {
        where: {
            id: req.params.id
        }
    })
    res.json('Niveau bien modifié');

})

router.delete('/:id', async function (req, res) {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
})

passport.deserializeUser(function (id, done) {
    user.findByPk(id, function (err, user) {
        console.log(user.id)
        console.log('VOILLLLAAA')
        done(err, user);
    });
});


module.exports = router;
