<?php

use PHPUnit\Framework\TestCase;

class ClientControllerTest extends TestCase
{
    private $clientController;
    private $mockModelClient;

    protected function setUp(): void
    {
        // Mock the ModelClient
        $this->mockModelClient = $this->createMock(ModelClient::class);
        // Create a ClientController instance with the mocked ModelClient
        $this->clientController = new ClientController();
        $this->clientController->client = $this->mockModelClient; // Override the client property
    }

    public function testLogin()
    {
        $email = 'test@example.com';
        $password = 'password123';

        // Mock the connexion method
        $this->mockModelClient->expects($this->once())
            ->method('connexion')
            ->with($this->equalTo($email), $this->equalTo($password))
            ->willReturn(true); // Simulate a successful login

        // Execute the method and assert the result
        $result = $this->clientController->login($email, $password);
        $this->assertTrue($result, "La connexion devrait être réussie.");
    }

    public function testSignup()
    {
        $id = 'client001';
        $name = 'John Doe';
        $email = 'john@example.com';
        $password = 'password123';

        // Mock the createClient method
        $this->mockModelClient->expects($this->once())
            ->method('createClient')
            ->with($this->equalTo($id), $this->equalTo($name), $this->equalTo($email), $this->equalTo($password))
            ->willReturn(true); // Simulate a successful signup

        // Execute the method and assert the result
        $result = $this->clientController->signup($id, $name, $email, $password);
        $this->assertTrue($result, "L'inscription devrait être réussie.");
    }

    public function testGetMenu()
    {
        $date = '2024-10-16';

        // Mock the viewMenu method
        $this->mockModelClient->expects($this->once())
            ->method('viewMenu')
            ->with($this->equalTo($date))
            ->willReturn([]); // Simulate fetching the menu

        // Execute the method and assert the result
        $result = $this->clientController->getMenu($date);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour le menu.");
    }

    public function testGetCommandes()
    {
        $id = 'client001';
        $date = '2024-10-16';

        // Mock the getCommads method
        $this->mockModelClient->expects($this->once())
            ->method('getCommads')
            ->with($this->equalTo($id), $this->equalTo($date))
            ->willReturn([]); // Simulate fetching the commandes

        // Execute the method and assert the result
        $result = $this->clientController->getCommandes($id, $date);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les commandes.");
    }

    public function testParrainage()
    {
        $code = 'PARRAIN123';
        $id = 'client001';

        // Mock the parrainage method
        $this->mockModelClient->expects($this->once())
            ->method('parrainage')
            ->with($this->equalTo($code), $this->equalTo($id))
            ->willReturn(null); // Simulate successful parrainage

        // Execute the method
        $this->clientController->parrainage($code, $id);
        $this->assertTrue(true); // Just check it does not throw an error
    }

    public function testFiole()
    {
        $id = 'client001';

        // Mock the fiole method
        $this->mockModelClient->expects($this->once())
            ->method('fiole')
            ->with($this->equalTo($id))
            ->willReturn('Fiole data'); // Simulate fetching fiole data

        // Execute the method and assert the result
        $result = $this->clientController->fiole($id);
        $this->assertEquals('Fiole data', $result, "La méthode devrait retourner des données de fiole.");
    }

    public function testHistorique()
    {
        $id = 'client001';

        // Mock the historique method
        $this->mockModelClient->expects($this->once())
            ->method('historique')
            ->with($this->equalTo($id))
            ->willReturn([]); // Simulate fetching historique data

        // Execute the method and assert the result
        $result = $this->clientController->historique($id);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour l'historique.");
    }

    public function testPromotion()
    {
        // Mock the promotion method
        $this->mockModelClient->expects($this->once())
            ->method('promotion')
            ->willReturn([]); // Simulate fetching promotion data

        // Execute the method and assert the result
        $result = $this->clientController->promotion();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les promotions.");
    }

    public function testReclamation()
    {
        $reclamation = 'REC001';
        $client = 'client001';
        $description = 'Description de la réclamation';
        $date = '2024-10-16';

        // Mock the insertreclamation method
        $this->mockModelClient->expects($this->once())
            ->method('insertreclamation')
            ->with($this->equalTo($reclamation), $this->equalTo($client), $this->equalTo($description), $this->equalTo($date))
            ->willReturn(true); // Simulate a successful reclamation insertion

        // Execute the method and assert the result
        $result = $this->clientController->reclamation($reclamation, $client, $description, $date);
        $this->assertTrue($result, "L'insertion de la réclamation devrait être réussie.");
    }

    public function testGetReclamation()
    {
        $id = 'client001';

        // Mock the getreclamation method
        $this->mockModelClient->expects($this->once())
            ->method('getreclamation')
            ->with($this->equalTo($id))
            ->willReturn([]); // Simulate fetching reclamation data

        // Execute the method and assert the result
        $result = $this->clientController->getReclamation($id);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les réclamations.");
    }
}
