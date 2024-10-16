<?php

include_once 'controllers/gerant_controller.php';

function routeGerantRequest($uriParts){
    $controller = new GerantController();

    $lastPart = end($uriParts);

    switch($lastPart){
        case 'get_employer':
            if($_SERVER['REQUEST_METHOD'] == 'GET'){
                $response = $controller->getEmployer();
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;
    }
}