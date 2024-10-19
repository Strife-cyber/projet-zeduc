<?php

include_once 'controllers/politic_controller.php';

function route_politique($uri_parts){
    $controller = new PoliticController();

    $lastpart = end($uri_parts);

    switch ($lastpart) {
        case 'get_politique':
            if($_SERVER['REQUEST_METHOD'] == 'GET'){
                $response = $controller->getPolitic();

                echo json_encode($response);
            } else {
                http_response_code(405);
                echo "Method not allowed";
            }
            break;

        case  'post_points':
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $id = $_POST['id'] ?? 0;
                $points = $_POST['points'] ?? 0;

                $response = $controller->updateUserPoints($id, $points);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo "Method not allowed";
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
}