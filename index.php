<?php

require_once 'routes/routes.php';
require_once 'routes/routes_employer.php';
require_once 'routes/routes_gerant.php';

// Ajoutez les en-têtes CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Remplacez par l'origine de votre application React
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS"); // Méthodes autorisées
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // En-têtes autorisés

// Gestion des requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // Répondre immédiatement aux requêtes OPTIONS
}

header("Content-Type: application/json"); // Définir le type de réponse sur JSON

function respond_correctly() {
    // Obtenir l'URI demandée
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // Diviser l'URI pour obtenir les segments
    $uriParts = explode('/', trim($uri, '/')); // Trim des slashes et division

    // Vérifier si "employee" est présent dans les segments
    if (in_array('gerant', $uriParts)) {
        routeGerantRequest($uriParts);
    } else if (in_array('employee', $uriParts)) {
        routeEmployerRequest($uriParts); // Appeler la fonction pour les employés
    } else {
        routeRequest($uriParts); // Appeler la fonction par défaut
    }
}

respond_correctly();