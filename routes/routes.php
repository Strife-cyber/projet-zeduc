<?php

include_once 'controllers/client_controller.php';

function routeRequest($uriParts) {
    $controller = new ClientController();

    $lastPart = end($uriParts); // Get the last part of the URI

    // Simple routing logic
    switch ($lastPart) {
        case 'commander':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id_commande = $_POST['id_commande'];
                $id_client = $_POST['id_client'];
                $id_plat = $_POST['id_plat'];
                $date_commande = $_POST['date_commande'];

                $response = $controller->insertCommande($id_commande, $id_client, $id_plat, $date_commande);
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

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

                $controller->signup($id, $name, $email, $password);
                $response = $controller->login($email, $password);

                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'menu':
            $datePart = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null; // Get the second last part for date
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                // Vérifiez si la date est fournie dans l'URL
                if ($datePart) {
                    // Appelez la méthode du contrôleur avec la date
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

        case 'commande':
            $id = isset($uriParts[count($uriParts) - 3]) ? $uriParts[count($uriParts) - 3] : null;
            $datePart = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                if($id and $datePart){
                    $response = $controller->getCommandes($id, $datePart);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Date or Id is required']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'parrain':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id = isset($_POST['id']) ? $_POST['id'] : '';
                $code = isset($_POST['code']) ? $_POST['code'] : '';

                $controller->parrainage($id, $code);
                echo json_encode('Parraine is added');
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'fiole':
            $id = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                if($id){
                    $response = $controller->fiole($id);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Id is required']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'historique':
            $id = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                if($id){
                    $response = $controller->historique($id);
                    echo json_encode($response);
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(['error' => 'Id is required']);
                }
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'promotion':
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $response = $controller->promotion();
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'reclamation':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $id_reclamation = isset($_POST['id_reclamation']) ? $_POST['id_reclamation'] : '';
                $id_client = isset($_POST['id_client']) ? $_POST['id_client'] : '';
                $description = isset($_POST['description']) ? $_POST['description'] : '';
                $date = isset($_POST['date']) ? $_POST['date'] : '';

                $response = $controller->reclamation($id_reclamation, $id_client, $description, $date);
                echo json_encode($response);
            } else {
                http_response_code(405); // Method Not Allowed
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;

        case 'mes_reclamation':
            $id = isset($uriParts[count($uriParts) - 2]) ? $uriParts[count($uriParts) - 2] : null;
            if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                $response = $controller->getReclamation($id);
                echo json_encode($response);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method Not Allowed']);
            }
            break;


        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
}
