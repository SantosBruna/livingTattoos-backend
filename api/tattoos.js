

module.exports = app => {
    const getUniqueTattoo = (req, res) => {
        app.db('tattoos')
            .where({ userId: req.user.id })
            .where({name: req.body.name})
            .then(tattoos => res.json(tattoos))
            .catch(err => res.status(400).json(err))
    }

    const getAllTattoos = (req, res) => {
        app.db('tattoos')
            .orderBy('name')
            .then(tattoos => res.json(tattoos))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.name) {
            return res.status(400).send('Nome é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tattoos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tattoos')
            .where({ name: req.params.name, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada nenhuma Tattoo com o nome ${req.params.name}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTattoToViveiro = (req, res, viveiro) => {
        app.db('tattoos')
            .where({ name: req.params.name, userId: req.user.id })
            .update({ viveiro })
            .then(_=> res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const validationTattoToViveiro = (req, res) => {
        app.db('tattoos')
            .where({ name: req.params.name, userId: req.user.id })
            .first()
            .then(tattoos => {
                if (!tattoos) {
                    const msg = `Tattoo com o nome ${req.params.name} não encontrada`
                    return resp.status(400).send(msg)
                }

                const viveiro = tattoos.viveiro

                if ((!viveiro) && (!req.body.caracteristicas)){
                    const msg = `Informe as características da tatuagem`
                    return res.status(400).send(msg)
                }
                if (viveiro){
                    updateTattoToViveiro(req, res, viveiro)
                }
                if (req.body.caracteristicas){

                     app.db('tattoos')
                       .update({
                           viveiro: req.body.viveiro,
                           caracteristicas: req.body.caracteristicas
                       })
                       .then(_=> res.status(204).send())
                       .catch(err => res.status(400).json(err))
                }
            })
    }


    return { getAllTattoos, getUniqueTattoo, save, remove, validationTattoToViveiro }
}
