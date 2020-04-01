module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/tattoos')
        .all(app.config.passport.authenticate())
        .get(app.api.tattoos.getAllTattoos)
        .post(app.api.tattoos.getUniqueTattoo)
        .post(app.api.tattoos.save)
        .put(app.api.tattoos.validationTattoToViveiro)

    app.route('/tattoos/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.tattoos.remove)
}
