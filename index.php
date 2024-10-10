<?php

require_once 'routes.php';

// Ajoutez les en-têtes CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Remplacez par l'origine de votre application React
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Méthodes autorisées
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // En-têtes autorisés

// Gestion des requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // Répondez immédiatement aux requêtes OPTIONS
}

header("Content-Type: application/json"); // Définir le type de réponse sur JSON
routeRequest(); // Appelez la fonction de routage
