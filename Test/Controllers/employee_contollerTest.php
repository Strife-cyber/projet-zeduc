<?php

use PHPUnit\Framework\TestCase;

class EmployeeControllerTest extends TestCase
{
    private $employeeController;
    private $mockModelEmployer;

    protected function setUp(): void
    {
        // Mock the ModelEmployer
        $this->mockModelEmployer = $this->createMock(ModelEmployer::class);
        // Create an instance of EmployeeController with the mocked ModelEmployer
        $this->employeeController = new EmployeeController();
        $this->employeeController->employee = $this->mockModelEmployer; // Override the employee property
    }

    public function testGetCommands()
    {
        $date = '2024-10-16';

        // Mock the getCommande method
        $this->mockModelEmployer->expects($this->once())
            ->method('getCommande')
            ->with($this->equalTo($date))
            ->willReturn([]); // Simulate fetching commands

        // Execute the method and assert the result
        $result = $this->employeeController->getCommands($date);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau de commandes.");
    }

    public function testUpdateCommands()
    {
        $id = 'CMD001';
        $livreur = 'Livreur001';

        // Mock the updateCommande method
        $this->mockModelEmployer->expects($this->once())
            ->method('updateCommande')
            ->with($this->equalTo($id), $this->equalTo($livreur))
            ->willReturn('Commande complétée'); // Simulate successful update

        // Execute the method and assert the result
        $result = $this->employeeController->updateCommands($id, $livreur);
        $this->assertEquals('Commande complétée', $result, "La mise à jour de la commande devrait être réussie.");
    }

    public function testGetPlat()
    {
        // Mock the getPlat method
        $this->mockModelEmployer->expects($this->once())
            ->method('getPlat')
            ->willReturn([]); // Simulate fetching plats

        // Execute the method and assert the result
        $result = $this->employeeController->getPlat();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau de plats.");
    }

    public function testInsererPlat()
    {
        $id = 'plat001';
        $image = ['name' => 'plat.jpg', 'tmp_name' => 'tmp/plat.jpg']; // Mock the uploaded image
        $nom = 'Plat Test';
        $prix = 15.99;

        // Mock the insererPlat method
        $this->mockModelEmployer->expects($this->once())
            ->method('insererPlat')
            ->with($this->equalTo($id), $this->equalTo($image), $this->equalTo($nom), $this->equalTo($prix))
            ->willReturn(['message' => 'true']); // Simulate successful insertion

        // Execute the method and assert the result
        $result = $this->employeeController->insererPlat($id, $image, $nom, $prix);
        $this->assertEquals(['message' => 'true'], $result, "L'insertion du plat devrait être réussie.");
    }

    public function testInsererMenu()
    {
        $id = 'plat001';
        $date = '2024-10-16';

        // Mock the insererMenu method
        $this->mockModelEmployer->expects($this->once())
            ->method('insererMenu')
            ->with($this->equalTo($id), $this->equalTo($date))
            ->willReturn(['message' => 'true']); // Simulate successful insertion

        // Execute the method and assert the result
        $result = $this->employeeController->insererMenu($id, $date);
        $this->assertEquals(['message' => 'true'], $result, "L'insertion du menu devrait être réussie.");
    }

    public function testDeleteMenu()
    {
        $id = 'plat001';
        $date = '2024-10-16';

        // Mock the delMenu method
        $this->mockModelEmployer->expects($this->once())
            ->method('delMenu')
            ->with($this->equalTo($id), $this->equalTo($date))
            ->willReturn(['message' => 'true']); // Simulate successful deletion

        // Execute the method and assert the result
        $result = $this->employeeController->deleteMenu($id, $date);
        $this->assertEquals(['message' => 'true'], $result, "La suppression du menu devrait être réussie.");
    }

    public function testGetMenu()
    {
        $date = '2024-10-16';

        // Mock the getMenu method
        $this->mockModelEmployer->expects($this->once())
            ->method('getMenu')
            ->with($this->equalTo($date))
            ->willReturn([]); // Simulate fetching the menu

        // Execute the method and assert the result
        $result = $this->employeeController->getMenu($date);
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour le menu.");
    }

    public function testStatisticPlat()
    {
        // Mock the statisticPlat method
        $this->mockModelEmployer->expects($this->once())
            ->method('statisticPlat')
            ->willReturn([]); // Simulate fetching statistics

        // Execute the method and assert the result
        $result = $this->employeeController->statisticPlat();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les statistiques des plats.");
    }

    public function testTempMoyen()
    {
        // Mock the tempMoyen method
        $this->mockModelEmployer->expects($this->once())
            ->method('tempMoyen')
            ->willReturn([]); // Simulate fetching average times

        // Execute the method and assert the result
        $result = $this->employeeController->tempMoyen();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour le temps moyen.");
    }

    public function testDetailsTemp()
    {
        // Mock the detailsTemp method
        $this->mockModelEmployer->expects($this->once())
            ->method('detailsTemp')
            ->willReturn([]); // Simulate fetching details

        // Execute the method and assert the result
        $result = $this->employeeController->detailsTemp();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les détails des temps.");
    }

    public function testCommandeLivrer()
    {
        // Mock the commandeLivrer method
        $this->mockModelEmployer->expects($this->once())
            ->method('commandeLivrer')
            ->willReturn([]); // Simulate fetching delivered orders

        // Execute the method and assert the result
        $result = $this->employeeController->commandeLivrer();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les commandes livrées.");
    }

    public function testGetReclamation()
    {
        // Mock the get_reclamation method
        $this->mockModelEmployer->expects($this->once())
            ->method('get_reclamation')
            ->willReturn([]); // Simulate fetching reclamation data

        // Execute the method and assert the result
        $result = $this->employeeController->getReclamation();
        $this->assertIsArray($result, "La méthode devrait retourner un tableau pour les réclamations.");
    }
}
