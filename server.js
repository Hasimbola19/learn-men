const express = require("express");
const cors = require("cors");
const app = express();
var corsOption = {
    origin: "http://localhost:8001"
};
app.use(cors(corsOption));
// Rendu des données sous forme de json
app.use(express.json());
// Rendu des données sous forme encodé
app.use(express.urlencoded({extended: true}));
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Base de données connecté");
    })
    .catch(err => {
        console.log("Impossible de se connecter à la base", err);
    })
// Route par défaut
app.get("/", (req,res) => {
    res.json({message: "L'API fonctionne."});
})
// Configurer le port pour l'écoute
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}.`);
})
