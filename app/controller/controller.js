const db = require("../models");
const Tutorial = db.model;
// CREER UNE NOUVELLE
exports.create = (req, res) => {
    // Valider la requette
    if (!req.body.title) {
        res.status(400).send({message: "Le contenu ne peut pas etre vide"});
        return;
    }
    // Creer une valeur
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    // Save data in database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la creation"
            });
        });
};

// GET ALL DATA FROM DATABASE
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la modification"
        });
    });
};

// GET ONE VALUE BY ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id)
        .then(data => {
            !data ? res.status(404).send({message: "Impossible de trouver le tutoriel" + id}) : res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Erreur lors de la recherche" + id + err});
        });
};

// UPDATE VALUE BY ID
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
           message: "La valeur à enregistrée ne peut pas être vide" 
        });
    }
    const id = req.params.id;
    Tutorial.findByIdAnUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Impossible de mettre à jour ${id}`
                });
            }else res.send({message: "Valeur mise à jour correctement"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour de " + id
            })
        })
}

// DELETE TUTORIAL BY ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data){
                res.status(404).send({
                    message: `IMpossible de supprimer ${id}`
                });
            }else{
                res.send({
                    message: "Valeur supprimée correctement!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer" + id + err
            });
        });
}

// DELETE ALL DATA 
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deleteCount} valeurs sont supprimées`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Une erreur est survenue lors de la suppréssion"
            })
        })
}

// FIND DATA
exports.findAllPublished = (req, res) => {
    Tutorial.find({published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la recherche"
            })
        })
}