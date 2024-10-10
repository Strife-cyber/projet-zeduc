<?php

include_once 'controllers/client_controller.php';

function routeRequest() {
    $controller = new ClientController();

    // Get the requested URI
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // Split the URI to get the last part (after the last '/')
    $uriParts = explode('/', trim($uri, '/')); // Trim slashes and split
    $lastPart = end($uriParts); // Get the last part of the URI

    // Simple routing logic
    switch ($lastPart) {
        case 'login':  // Check for 'login' directly
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                // Get POST data
                $email = isset($_POST['email']) ? $_POST['email'] : '';
                $password = isset($_POST['password']) ? $_POST['password'] : '';
                $response = $controller->login($email, $password);
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'signup':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                $name = isset($_POST['name']) ? $_POST['name'] : '';
                $email = isset($_POST['email']) ? $_POST['email'] : '';
                $password = isset($_POST['password']) ? $_POST['password'] : '';

                $response = $controller->signup($id, $name, $email, $password);

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
