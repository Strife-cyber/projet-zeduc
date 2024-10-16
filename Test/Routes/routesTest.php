<?php

use PHPUnit\Framework\TestCase;

class RouteRequestTest extends TestCase
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

    public function testLoginSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('login')
            ->with($this->equalTo('user@example.com'), $this->equalTo('password123'))
            ->willReturn(['status' => 'success', 'token' => 'abc123']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['email'] = 'user@example.com';
        $_POST['password'] = 'password123';
        $uriParts = ['api', 'client', 'login'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['status' => 'success', 'token' => 'abc123']),
            ob_get_contents()
        );
    }

    public function testLoginMethodNotAllowed()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET'; // Invalid method
        $uriParts = ['api', 'client', 'login'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Method Not Allowed']),
            ob_get_contents()
        );

        $this->assertEquals(405, http_response_code());
    }

    public function testSignupSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('signup')
            ->with($this->equalTo('1'), $this->equalTo('Test User'), $this->equalTo('user@example.com'), $this->equalTo('password123'));

        $controllerMock->expects($this->once())
            ->method('login')
            ->with($this->equalTo('user@example.com'), $this->equalTo('password123'))
            ->willReturn(['status' => 'success', 'token' => 'abc123']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id'] = '1';
        $_POST['name'] = 'Test User';
        $_POST['email'] = 'user@example.com';
        $_POST['password'] = 'password123';
        $uriParts = ['api', 'client', 'signup'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['status' => 'success', 'token' => 'abc123']),
            ob_get_contents()
        );
    }

    public function testMenuSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('getMenu')
            ->with($this->equalTo('2024-10-16'))
            ->willReturn(['menu1', 'menu2']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'menu', '2024-10-16'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['menu1', 'menu2']),
            ob_get_contents()
        );
    }

    public function testMenuMissingDate()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'menu'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Date is required']),
            ob_get_contents()
        );

        $this->assertEquals(400, http_response_code());
    }

    public function testCommandeSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('getCommandes')
            ->with($this->equalTo('CMD001'), $this->equalTo('2024-10-16'))
            ->willReturn(['commande1', 'commande2']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'commande', 'CMD001', '2024-10-16'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['commande1', 'commande2']),
            ob_get_contents()
        );
    }

    public function testCommandeMissingIdOrDate()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'commande'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Date or Id is required']),
            ob_get_contents()
        );

        $this->assertEquals(400, http_response_code());
    }

    public function testParrainSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('parrainage')
            ->with($this->equalTo('1'), $this->equalTo('code123'));

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id'] = '1';
        $_POST['code'] = 'code123';
        $uriParts = ['api', 'client', 'parrain'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode('Parraine is added'),
            ob_get_contents()
        );
    }

    public function testFioleSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('fiole')
            ->with($this->equalTo('1'))
            ->willReturn(['fioleData']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'fiole', '1'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['fioleData']),
            ob_get_contents()
        );
    }

    public function testFioleMissingId()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'fiole'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Id is required']),
            ob_get_contents()
        );

        $this->assertEquals(400, http_response_code());
    }

    public function testHistoriqueSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('historique')
            ->with($this->equalTo('1'))
            ->willReturn(['historiqueData']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'historique', '1'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['historiqueData']),
            ob_get_contents()
        );
    }

    public function testPromotionSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('promotion')
            ->willReturn(['promotionData']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'promotion'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['promotionData']),
            ob_get_contents()
        );
    }

    public function testReclamationSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('reclamation')
            ->with($this->equalTo('rec001'), $this->equalTo('1'), $this->equalTo('Issue description'), $this->equalTo('2024-10-16'))
            ->willReturn(['status' => 'success']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_POST['id_reclamation'] = 'rec001';
        $_POST['id_client'] = '1';
        $_POST['description'] = 'Issue description';
        $_POST['date'] = '2024-10-16';
        $uriParts = ['api', 'client', 'reclamation'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['status' => 'success']),
            ob_get_contents()
        );
    }

    public function testMesReclamationSuccess()
    {
        // Mock the ClientController
        $controllerMock = $this->createMock(ClientController::class);
        $controllerMock->expects($this->once())
            ->method('getReclamation')
            ->with($this->equalTo('1'))
            ->willReturn(['reclamation1', 'reclamation2']);

        $GLOBALS['controller'] = $controllerMock;

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'mes_reclamation', '1'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['reclamation1', 'reclamation2']),
            ob_get_contents()
        );
    }

    public function testNotFound()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $uriParts = ['api', 'client', 'unknown'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Not Found']),
            ob_get_contents()
        );

        $this->assertEquals(404, http_response_code());
    }

    public function testMethodNotAllowed()
    {
        $_SERVER['REQUEST_METHOD'] = 'PUT'; // Invalid method
        $uriParts = ['api', 'client', 'login'];

        routeRequest($uriParts);

        $this->assertJsonStringEqualsJsonString(
            json_encode(['error' => 'Method Not Allowed']),
            ob_get_contents()
        );

        $this->assertEquals(405, http_response_code());
    }
}
