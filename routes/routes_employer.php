<?php

include_once 'controllers/employee_controller.php';

function routeEmployerRequest($uriParts){
    $controller = new EmployeeController();

    $lastPart = end($uriParts);

    switch($lastPart){

        case 'get_commande':
            $datePart = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                if ($datePart){
                    $response = $controller->getCommands($datePart);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Date is required']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'get_plat':
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $response = $controller->getPlat();
                echo json_encode($response);
            } else {
                http_response_code(405); // Set the HTTP status code to 405
                echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
            }
            break;

        case 'inserer_plat':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                // Utilisez $_FILES pour récupérer l'image
                $image = isset($_FILES['image']) ? $_FILES['image'] : '';
                $nom = isset($_POST['nom']) ? $_POST['nom'] : '';
                $prix = isset($_POST['prix']) ? $_POST['prix'] : '';

                // Vérifiez si un fichier a été téléchargé
                if (!empty($image) && $image['error'] == UPLOAD_ERR_OK) {
                    $response = $controller->insererPlat($id, $image, $nom, $prix);
                    echo json_encode($response);
                } else {
                    echo json_encode(['error' => 'Aucun fichier téléchargé ou erreur de téléchargement.']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;


        case 'inserer_menu':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                $date = isset($_POST['date']) ? $_POST['date'] : '';

                $response = $controller->insererMenu($id, $date);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'get_menu':
            $datePart = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                if ($datePart){
                    $response = $controller->getMenu($datePart);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Date is required']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;


        case 'del_menu':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                $date = isset($_POST['date']) ? $_POST['date'] : '';

                $response = $controller->deleteMenu($id, $date);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'update_commande':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                // Directly access 'id' from $_POST
                if (isset($_POST['id'])) {
                    $id = $_POST['id'];

                    // Call the controller method to update the command
                    $response = $controller->updateCommands($id);

                    // Return a success response
                    http_response_code(200); // Set the HTTP status code to 200
                    echo json_encode(['status' => 'success', 'message' => 'Commande updated successfully.', 'data' => $response]);
                } else {
                    // Return an error response if 'id' is not set
                    http_response_code(400); // Set the HTTP status code to 400
                    echo json_encode(['status' => 'error', 'message' => 'ID is required.']);
                }
            } else {
                // Return an error response if the request method is not PUT
                http_response_code(405); // Set the HTTP status code to 405
                echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
            }
            break;
    }
}