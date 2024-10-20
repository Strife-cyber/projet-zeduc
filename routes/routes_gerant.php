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

        case 'insert_employer':
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                $nom = isset($_POST['nom']) ? $_POST['nom'] : '';
                $email = isset($_POST['email']) ? $_POST['email'] : '';
                $password = isset($_POST['password']) ? $_POST['password'] : '';
                $date = isset($_POST['date']) ? $_POST['date'] : '';

                $response = $controller->insertEmployer($id, $nom, $email, $password, $date);
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'delete_employer':
            $id = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
                $response = $controller->deleteEmployer($id);
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
}