var express = require('express');
var morgan = require('morgan');
var userModel = require('./models').User;
var roles = require('./models').Roles;
var passport = require('passport');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var user = require('./controlleur/userControlleur');
var niveau = require('./controlleur/niveauControlleur');
var avancement = require('./controlleur/avancementControlleur');
var secureRoute = require('./controlleur/secureControlleur')
const jwt = require('jsonwebtoken');
var db = require('./models');
var cors = require('cors');
var port = 5000


require('./authentification/passport_config');

var app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())


app.post('/signup', async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const sameUser = await userModel.findOne({ where: { username: req.body.username } });
    if (req.body.firstName, req.body.lastName, req.body.username, req.body.password) {

        if (sameUser === null) {
            userModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword,
                vitesse: 5,
                paddle: 100,
                ligneBlock: 2
            })
            return res.json('Vous êtes bien inscrit.');
        }
        else {
            return res.json('Utilisateur déjà utilisé');
        }
    }
})
app.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                const body = { id: user.id, RoleId: user.RoleId };
                const token = jwt.sign({ user: body }, 'top_secret');
                const info = "Vous êtes bien connecté."
                return res.json([{ token }, { info }]);
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

app.post('/roles', async function (req, res) {
    const sameRoles = await roles.findOne({ where: { status: "user", status: "admin"} });

        if (sameRoles === null) {
            roles.create({
                id: req.body.id,
                status: req.body.status
            })
            return res.json('Role bien créé.');
        }
        else {
            return res.json('Role déjà créé');
        }
    
})

app.use('/user', user)
app.use('/niveau', niveau)
app.use('/avancement', avancement)
app.use('/profile', passport.authenticate('jwt', { session: false }), secureRoute);

app.get('*', function (req, res) {
    return res.json('Erreur 404.');
});

db.sequelize.sync().then(() => {
    app.listen(port, function () {
        console.log('Server started on port ' + port)
    });
});

