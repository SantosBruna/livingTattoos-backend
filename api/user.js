const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash


            app.db('users')
                .insert({
                    name: req.body.name,
                    email: req.body.email,
                    password
                })
                .returning('id')
                .then(function (response) {
                    return app.db('tattoos')
                        .insert({
                            name: req.body.nameTattoo,
                            foto: req.body.foto,
                            userId: response[0],
                            fotoLoguin:req.body.fotoLoguin
                        })
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))


        })
    }

    return { save }
}
