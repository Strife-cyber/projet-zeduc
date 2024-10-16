<?php

use PHPUnit\Framework\TestCase;

class ModelCommandeTest extends TestCase
{
    private $modelCommande;
    private $mockPDO;
    private $mockStmt;

    protected function setUp(): void
    {
        // Mock the PDO connection
        $this->mockPDO = $this->createMock(PDO::class);
        // Mock the PDOStatement
        $this->mockStmt = $this->createMock(PDOStatement::class);

        // Override the constructor of ModelCommande to use the mocked PDO
        $this->modelCommande = new ModelCommande($this->mockPDO);
    }

    public function testInsererCommande()
    {
        $id_commande = 'CMD001';
        $id_client = 'user001';
        $id_plat = 'plat001';
        $date_commande = date('Y-m-d');
        $status = true;

        // Mock the prepare method on the PDO object
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("INSERT INTO commande (id_commande, id_client, id_plat, date_commande, status) VALUES (:id_commande, :id_client, :id_plat, :date_commande, :status)"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->exactly(5))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_commande'), $this->equalTo($id_commande)],
                [$this->equalTo(':id_client'), $this->equalTo($id_client)],
                [$this->equalTo(':id_plat'), $this->equalTo($id_plat)],
                [$this->equalTo(':date_commande'), $this->equalTo($date_commande)],
                [$this->equalTo(':status'), $this->equalTo($status)]
            );

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert that the result is true
        $result = $this->modelCommande->insererCommande($id_commande, $id_client, $id_plat, $date_commande, $status);
        $this->assertTrue($result, "Commande ajoutée avec succès.");
    }

    public function testGetCommandeById()
    {
        $id_commande = 'CMD001';
        
        // Mock the prepare method for selecting a command
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM commande WHERE id_commande = :id_commande"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->once())
            ->method('bindParam')
            ->with($this->equalTo(':id_commande'), $this->equalTo($id_commande));

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetch method to return a command record
        $this->mockStmt->expects($this->once())
            ->method('fetch')
            ->willReturn(['id_commande' => $id_commande, 'id_client' => 'user001', 'id_plat' => 'plat001', 'date_commande' => date('Y-m-d'), 'status' => true]);

        // Execute the method and assert the result
        $commande = $this->modelCommande->getCommandeById($id_commande);
        $this->assertNotNull($commande, "Commande trouvée.");
        $this->assertEquals($id_commande, $commande['id_commande']);
    }

    public function testGetAllCommandes()
    {
        // Mock the prepare method for selecting all commands
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM commande"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return a list of commands
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_commande' => 'CMD001', 'id_client' => 'user001', 'id_plat' => 'plat001', 'date_commande' => date('Y-m-d'), 'status' => true],
                ['id_commande' => 'CMD002', 'id_client' => 'user002', 'id_plat' => 'plat002', 'date_commande' => date('Y-m-d'), 'status' => false]
            ]);

        // Execute the method and assert the result
        $commandes = $this->modelCommande->getAllCommandes();
        $this->assertIsArray($commandes);
        $this->assertCount(2, $commandes, "Il devrait y avoir 2 commandes.");
    }
}
