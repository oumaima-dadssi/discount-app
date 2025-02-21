const mongoose = require('mongoose');

// Définir le schéma des données pour l'utilisateur
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assurer l'unicité de l'email
    },
    phone: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

// Créer le modèle basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
