// Sélectionner les éléments nécessaires
const form = document.getElementById("userForm");
const resultDiv = document.getElementById("result");
const playButton = document.getElementById("playButton");

// Fonction pour générer la réduction aléatoire
function generateDiscount() {
    const discountPercentage = Math.floor(Math.random() * 100) + 1; // Générer un pourcentage entre 1 et 100
    return discountPercentage;
}

// Événement lors de la soumission du formulaire
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Empêche l'envoi réel du formulaire

    // Récupérer les valeurs du formulaire
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Générer une réduction aléatoire
    const discount = generateDiscount();

    // Créer un objet avec les données du formulaire et la réduction générée
    const userData = {
        firstName,
        lastName,
        email,
        phone,
        discount
    };

    // Envoyer les données via une requête POST au serveur
    fetch('http://localhost:5000/jouer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData) // Envoie les données du formulaire et la réduction
    })
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        // Afficher le résultat
        resultDiv.classList.remove("hidden");  // Afficher la section de résultat
        resultDiv.innerHTML = `Félicitations ! Vous avez gagné une réduction de ${data.discount}% sur la prochaine session de formation.`;
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données:', error);
    });

    // Optionnel : Réinitialiser le formulaire
    form.reset();
});
