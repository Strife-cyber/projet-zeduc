<?php

use PHPUnit\Framework\TestCase;

class ModelEmployerTest extends TestCase
{
    private $modelEmployer;
    private $mockPDO;
    private $mockStmt;

    protected function setUp(): void
    {
        // Mock the PDO connection
        $this->mockPDO = $this->createMock(PDO::class);
        // Mock the PDOStatement
        $this->mockStmt = $this->createMock(PDOStatement::class);

        // Override the constructor of ModelEmployer to use the mocked PDO
        $this->modelEmployer = new ModelEmployer($this->mockPDO);
    }

    public function testGetCommande()
    {
        $date = '2024-10-16';

        // Mock the prepare method for selecting commands
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT c.id_commande, u.nom AS client_nom, p.nom AS plat_nom, c.status, p.prix 
                FROM commande c 
                JOIN utilisateur u ON c.id_client = u.id
                JOIN plat p ON c.id_plat = p.id_plat
                WHERE date_commande = :date"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->once())
            ->method('bindParam')
            ->with($this->equalTo(':date'), $this->equalTo($date));

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return a list of commands
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_commande' => 'CMD001', 'client_nom' => 'Client A', 'plat_nom' => 'Plat A', 'status' => true, 'prix' => 10.0],
                ['id_commande' => 'CMD002', 'client_nom' => 'Client B', 'plat_nom' => 'Plat B', 'status' => false, 'prix' => 15.0]
            ]);

        // Execute the method and assert the result
        $commandes = $this->modelEmployer->getCommande($date);
        $this->assertCount(2, $commandes, "Il devrait y avoir 2 commandes.");
    }

    public function testUpdateCommande()
    {
        $id = 'CMD001';
        $livreur = 'LIV001';

        // Mock the prepare method for updating the command status
        $this->mockPDO->expects($this->exactly(2))
            ->method('prepare')
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->at(0))
            ->method('bindParam')
            ->with($this->equalTo(':id'), $this->equalTo($id));

        $this->mockStmt->expects($this->at(1))
            ->method('bindParam')
            ->with($this->equalTo(':livreur'), $this->equalTo($livreur));

        // Mock the execute method for both statements
        $this->mockStmt->expects($this->exactly(2))
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert the result
        $result = $this->modelEmployer->updateCommande($id, $livreur);
        $this->assertEquals('Commande complétée', $result);
    }

    public function testGetReclamation()
    {
        // Mock the prepare method for selecting reclamations
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM reclamation r JOIN utilisateur u ON r.id_client = u.id"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return a list of reclamations
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_reclamation' => 'REC001', 'client_id' => 'user001', 'description' => 'Reclamation A'],
                ['id_reclamation' => 'REC002', 'client_id' => 'user002', 'description' => 'Reclamation B']
            ]);

        // Execute the method and assert the result
        $reclamations = $this->modelEmployer->get_reclamation();
        $this->assertCount(2, $reclamations, "Il devrait y avoir 2 réclamations.");
    }

    public function testInsererMenu()
    {
        $idPlat = 'plat001';
        $dateMenu = date('Y-m-d');

        // Mock the prepare method for inserting a menu
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("INSERT INTO menu (id_plat, date_menu) VALUES (:id_plat, :date_menu)"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->with([':id_plat' => $idPlat, ':date_menu' => $dateMenu])
            ->willReturn(true);

        // Execute the method and assert the result
        $result = $this->modelEmployer->insererMenu($idPlat, $dateMenu);
        $this->assertEquals(['message' => 'true'], $result);
    }

    public function testDelMenu()
    {
        $id = 'plat001';
        $date = date('Y-m-d');

        // Mock the prepare method for deleting a menu
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("DELETE FROM menu WHERE id_plat = :id AND date_menu = :date"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->exactly(2))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id'), $this->equalTo($id)],
                [$this->equalTo(':date'), $this->equalTo($date)]
            );

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert the result
        $result = $this->modelEmployer->delMenu($id, $date);
        $this->assertEquals(['message' => 'true'], $result);
    }

    public function testGetPlat()
    {
        // Mock the prepare method for selecting all plats
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM plat"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return a list of plats
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_plat' => 'plat001', 'image' => 'path/to/image1.jpg', 'nom' => 'Plat A', 'prix' => 10.0],
                ['id_plat' => 'plat002', 'image' => 'path/to/image2.jpg', 'nom' => 'Plat B', 'prix' => 15.0]
            ]);

        // Mock file_exists and file_get_contents to simulate image processing
        $this->mockFileFunctions();

        // Execute the method and assert the result
        $plats = $this->modelEmployer->getPlat();
        $this->assertCount(2, $plats, "Il devrait y avoir 2 plats.");
        $this->assertStringStartsWith('data:image/jpeg;base64,', $plats[0]['image'], "L'image devrait être encodée en base64.");
    }

    public function testGetMenu()
    {
        $date = '2024-10-16';

        // Mock the prepare method for selecting the menu of the day
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM menu_du_jour(:date)"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam method
        $this->mockStmt->expects($this->once())
            ->method('bindParam')
            ->with($this->equalTo(':date'), $this->equalTo($date));

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return a list of menus
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_menu' => 'menu001', 'image' => 'path/to/image3.jpg', 'nom' => 'Menu A'],
                ['id_menu' => 'menu002', 'image' => 'path/to/image4.jpg', 'nom' => 'Menu B']
            ]);

        // Mock file_exists and file_get_contents to simulate image processing
        $this->mockFileFunctions();

        // Execute the method and assert the result
        $menus = $this->modelEmployer->getMenu($date);
        $this->assertCount(2, $menus, "Il devrait y avoir 2 menus.");
        $this->assertStringStartsWith('data:image/jpeg;base64,', $menus[0]['image'], "L'image devrait être encodée en base64.");
    }

    public function testInsererPlat()
    {
        $id = 'plat001';
        $image = ['name' => 'image.jpg', 'tmp_name' => '/tmp/image.jpg'];
        $nom = 'Plat Test';
        $prix = 20.0;

        // Mock the method to check directory creation
        if (!is_dir('uploads/images/' . $id . '/')) {
            mkdir('uploads/images/' . $id . '/', 0777, true);
        }

        // Mock the move_uploaded_file to return true
        $this->mockMoveUploadedFile();

        // Mock the prepare method for inserting a plat
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->with([':id' => $id, ':image' => 'uploads/images/plat001/image.jpg', ':nom' => $nom, ':prix' => $prix])
            ->willReturn(true);

        // Execute the method and assert the result
        $result = $this->modelEmployer->insererPlat($id, $image, $nom, $prix);
        $this->assertEquals(['message' => 'true'], $result);
    }

    public function testStatisticPlat()
    {
        // Mock the prepare method for statistics
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM plats_populaires()"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return statistics
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['plat' => 'Plat A', 'commandes' => 10],
                ['plat' => 'Plat B', 'commandes' => 15]
            ]);

        // Execute the method and assert the result
        $statistics = $this->modelEmployer->statisticPlat();
        $this->assertCount(2, $statistics, "Il devrait y avoir 2 statistiques.");
    }

    public function testTempMoyen()
    {
        // Mock the prepare method for average time
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM temps_moyen_traitement_reclamations()"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return average times
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['reclamation_id' => 'REC001', 'temps' => '1 heure'],
                ['reclamation_id' => 'REC002', 'temps' => '30 minutes']
            ]);

        // Execute the method and assert the result
        $tempsMoyen = $this->modelEmployer->tempMoyen();
        $this->assertCount(2, $tempsMoyen, "Il devrait y avoir 2 moyennes de temps.");
    }

    public function testDetailsTemp()
    {
        // Mock the prepare method for details of average time
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM details_temps_traitement_reclamations()"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return details of average times
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_reclamation' => 'REC001', 'details' => 'Détails A'],
                ['id_reclamation' => 'REC002', 'details' => 'Détails B']
            ]);

        // Execute the method and assert the result
        $detailsTemp = $this->modelEmployer->detailsTemp();
        $this->assertCount(2, $detailsTemp, "Il devrait y avoir 2 détails de temps.");
    }

    public function testCommandeLivrer()
    {
        // Mock the prepare method for total commandes
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT * FROM total_commandes_tous_employes()"))
            ->willReturn($this->mockStmt);

        // Mock the execute method to return true
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return total commandes
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['employe_id' => 'EMP001', 'total_commandes' => 50],
                ['employe_id' => 'EMP002', 'total_commandes' => 75]
            ]);

        // Execute the method and assert the result
        $commandesLivrees = $this->modelEmployer->commandeLivrer();
        $this->assertCount(2, $commandesLivrees, "Il devrait y avoir 2 commandes livrées.");
    }

    // Helper function to mock file_exists and file_get_contents
    private function mockFileFunctions()
    {
        $this->getMockBuilder('file_exists')
            ->willReturn(true);

        $this->getMockBuilder('file_get_contents')
            ->willReturn('fake_image_data');
    }

    // Helper function to mock move_uploaded_file
    private function mockMoveUploadedFile()
    {
        $this->getMockBuilder('move_uploaded_file')
            ->willReturn(true);
    }
}
