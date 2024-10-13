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