module.exports = app => {
    const tutorials = require("../controller/controller.js");
    var router = require("express").Router();
    // Créer un tutorial
    router.post("/", tutorials.create);
    // Récuperer tout les tutoriels
    router.get("/", tutorials.findAll);
    // Récuperer tout les tutoriels publié
    router.get("/published", tutorials.findAllPublished);
    // Récuperer un tutoriel par id
    router.get("/:id", tutorials.findOne);
    // Mettre à jour par id
    router.put("/:id", tutorials.update);
    // Supprimer un tutorial par id
    router.delete("/:id", tutorials.delete);
    // Supprimer tout les tutoriels
    router.delete("/", tutorials.deleteAll);
    app.use('/api/tutorials', router);
};