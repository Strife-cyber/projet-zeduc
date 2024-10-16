<?php

use PHPUnit\Framework\TestCase;

class RouteEmployerRequestTest extends TestCase
{
    protected function setUp(): void
    {
        // Start output buffering to capture echo statements
        ob_start();
    }

    protected function tearDown(): void
    {
        // Clean output buffer
        ob_end_clean();
    }

    public function testGetCommandeSuccess()
    {
        // Mock the EmployeeController
        $controllerMock = $this->createMock(EmployeeController::class);
        $controllerMock->expects($this->once())
            ->method('getCommands')
            ->with($this->equalTo('2024-10-16'))
            ->willReturn(['commande1', 'commande2']);

        // Override the EmployeeController in the routeEmployerRequest function
        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'employer', 'get_commande', '2024-10-16'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['commande1', 'commande2']),
            ob_get_contents()
        );
    }

    public function testGetCommandeMissingDate()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'employer', 'get_commande'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Date is required']),
            ob_get_contents()
        );

        $this->assertEquals(400, http_response_code());
    }

    public function testGetPlatSuccess()
    {
        $controllerMock = $this->createMock(EmployeeController::class);
        $controllerMock->expects($this->once())
            ->method('getPlat')
            ->willReturn(['plat1', 'plat2']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'employer', 'get_plat'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['plat1', 'plat2']),
            ob_get_contents()
        );
    }

    public function testInsererPlatSuccess()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id'] = 'plat001';
        $_POST['nom'] = 'Plat Test';
        $_POST['prix'] = 20.00;
        $_FILES['image'] = [
            'name' => 'plat.jpg',
            'type' => 'image/jpeg',
            'tmp_name' => '/tmp/plat.jpg',
            'error' => UPLOAD_ERR_OK,
            'size' => 1024,
        ];

        $controllerMock = $this->createMock(EmployeeController::class);
        $controllerMock->expects($this->once())
            ->method('insererPlat')
            ->with('plat001', $_FILES['image'], 'Plat Test', 20.00)
            ->willReturn(['message' => 'true']);

        $GLOBALS['controller'] = $controllerMock;

        $uriParts = ['api', 'employer', 'inserer_plat'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['message' => 'true']),
            ob_get_contents()
        );
    }

    public function testInsererPlatFileError()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id'] = 'plat001';
        $_POST['nom'] = 'Plat Test';
        $_POST['prix'] = 20.00;
        $_FILES['image'] = [
            'name' => 'plat.jpg',
            'error' => UPLOAD_ERR_NO_FILE, // Simulating no file uploaded
        ];

        $uriParts = ['api', 'employer', 'inserer_plat'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Aucun fichier téléchargé ou erreur de téléchargement.']),
            ob_get_contents()
        );
    }

    public function testUpdateCommandeSuccess()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id'] = 'CMD001';
        $_POST['livreur'] = 'Livreur001';

        $controllerMock = $this->createMock(EmployeeController::class);
        $controllerMock->expects($this->once())
            ->method('updateCommands')
            ->with('CMD001', 'Livreur001')
            ->willReturn(['status' => 'success']);

        $GLOBALS['controller'] = $controllerMock;

        $uriParts = ['api', 'employer', 'update_commande'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['status' => 'success', 'message' => 'Commande updated successfully.', 'data' => ['status' => 'success']]),
            ob_get_contents()
        );
    }

    public function testUpdateCommandeMissingId()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';

        $uriParts = ['api', 'employer', 'update_commande'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['status' => 'error', 'message' => 'ID is required.']),
            ob_get_contents()
        );

        $this->assertEquals(400, http_response_code());
    }

    public function testMethodNotAllowed()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $uriParts = ['api', 'employer', 'get_commande', '2024-10-16'];

        routeEmployerRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Method Not Allowed']),
            ob_get_contents()
        );

        $this->assertEquals(405, http_response_code());
    }
}
