const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Importer le modèle User
const path = require('path');
const helmet = require('helmet'); // Pour renforcer la sécurité HTTP

const app = express();

// Middleware de sécurité pour définir divers headers HTTP
app.use(helmet());

// Middleware pour traiter les données envoyées en JSON
app.use(express.json());

// Connexion à MongoDB avec une variable d'environnement
// En production, définissez MONGO_URI via le dashboard Heroku ou la CLI
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jeux';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connexion réussie à MongoDB"))
.catch((err) => console.error("Erreur de connexion à MongoDB", err));

// Servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour jouer et enregistrer les données utilisateur
app.post('/jouer', async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;

    // Générer une réduction aléatoire entre 1 et 100
    const discount = Math.floor(Math.random() * 100) + 1;

    try {
        // Créer une nouvelle instance de l'utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            discount,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Répondre avec un message de succès et la réduction générée
        res.status(200).json({
            message: 'Données enregistrées avec succès',
            discount: discount,
        });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des données :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route pour servir la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur sur le port défini par Heroku ou 5000 en local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur opérationnel sur le port ${PORT} ✅`);
});
