<?php

include_once 'controllers/admin_controller.php';

function routeAdminRequest($uriParts) {
    $controller = new AdminController();

    $lastPart = end($uriParts);

    switch ($lastPart){
        case 'add_event':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = $_POST['id'];
                $title = $_POST['title'];
                $description = $_POST['description'];
                $jeux = $_POST['jeux'];

                $response = $controller->insertEvenement($id, $title, $description, $jeux);

                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        case 'add_promotion':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id_promotion = $_POST['id_promotion'];
                $id_admin = $_POST['id_admin'];
                $debut = $_POST['debut'];
                $fin = $_POST['fin'];
                $description = $_POST['description'];

                $response = $controller->insertPromotion($id_promotion, $id_admin, $debut, $fin, $description);

                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        case 'get_all_events':
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $response = $controller->getAllEvenements();

                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        case 'delete_event':
            if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
                // Retrieve the id from the query parameter in the URL
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    $response = $controller->deleteEvenementById($id);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Missing id']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        case 'get_all_promotions':
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $response = $controller->getAllPromotions();

                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        case 'delete_promotion':
            if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
                // Retrieve the id_promotion from the query parameter in the URL
                if (isset($_GET['id_promotion'])) {
                    $id_promotion = $_GET['id_promotion'];
                    $response = $controller->deletePromotionById($id_promotion);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Missing id_promotion']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'method not allowed']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'not found']);
            break;
    }
}
