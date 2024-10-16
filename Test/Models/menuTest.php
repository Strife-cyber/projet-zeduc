<?php

use PHPUnit\Framework\TestCase;
use PDO;
use PDOStatement;

class ModelMenuTest extends TestCase
{
    private $modelMenu;
    private $mockPDO;
    private $mockStmt;

    // Set up the PDO and PDOStatement mocks before each test
    protected function setUp(): void
    {
        // Mock the PDO connection
        $this->mockPDO = $this->createMock(PDO::class);

        // Mock the PDOStatement
        $this->mockStmt = $this->createMock(PDOStatement::class);

        // Pass the mock PDO connection to the ModelMenu
        $this->modelMenu = new ModelMenu($this->mockPDO);
    }

    public function testInsererMenu()
    {
        $id_plat = 'plat001';
        $date_menu = date('Y-m-d');

        // Mock the prepare method on the PDO object
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('INSERT INTO menu (id_plat, date_menu) VALUES (:id_plat, :date_menu)'))
            ->willReturn($this->mockStmt);

        // Mock the bindParam and execute methods on the PDOStatement object
        $this->mockStmt->expects($this->exactly(2))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_plat'), $this->equalTo($id_plat)],
                [$this->equalTo(':date_menu'), $this->equalTo($date_menu)]
            );

        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert that the result is true
        $result = $this->modelMenu->insererMenu($id_plat, $date_menu);
        $this->assertTrue($result, "Plat ajouté au menu avec succès.");
    }

    public function testGetMenuByPlatAndDate()
    {
        $id_plat = 'plat001';
        $date_menu = date('Y-m-d');

        // Mock the prepare method for getMenuByPlatAndDate
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('SELECT * FROM menu WHERE id_plat = :id_plat AND date_menu = :date_menu'))
            ->willReturn($this->mockStmt);

        // Mock the bindParam and execute methods
        $this->mockStmt->expects($this->exactly(2))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_plat'), $this->equalTo($id_plat)],
                [$this->equalTo(':date_menu'), $this->equalTo($date_menu)]
            );

        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetch method to return mock menu data
        $this->mockStmt->expects($this->once())
            ->method('fetch')
            ->willReturn(['id_plat' => $id_plat, 'date_menu' => $date_menu]);

        // Execute the method and assert the result
        $menu = $this->modelMenu->getMenuByPlatAndDate($id_plat, $date_menu);
        $this->assertNotNull($menu, "Aucun plat trouvé avec cet ID et cette date.");
        $this->assertEquals($id_plat, $menu['id_plat']);
        $this->assertEquals($date_menu, $menu['date_menu']);
    }

    public function testGetAllMenus()
    {
        // Mock the prepare method for getAllMenus
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('SELECT * FROM menu'))
            ->willReturn($this->mockStmt);

        // Mock the execute method
        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Mock the fetchAll method to return mock menu data
        $this->mockStmt->expects($this->once())
            ->method('fetchAll')
            ->willReturn([
                ['id_plat' => 'plat001', 'date_menu' => '2024-10-10'],
                ['id_plat' => 'plat002', 'date_menu' => '2024-10-11']
            ]);

        // Execute the method and assert the result
        $menus = $this->modelMenu->getAllMenus();
        $this->assertIsArray($menus);
        $this->assertCount(2, $menus, "Le menu ne doit pas être vide.");
    }

    public function testUpdateMenu()
    {
        $id_plat = 'plat001';
        $old_date_menu = '2024-10-08';
        $new_date_menu = '2024-10-09';

        // Mock the prepare method for updateMenu
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('UPDATE menu SET date_menu = :new_date_menu WHERE id_plat = :id_plat AND date_menu = :old_date_menu'))
            ->willReturn($this->mockStmt);

        // Mock the bindParam and execute methods
        $this->mockStmt->expects($this->exactly(3))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_plat'), $this->equalTo($id_plat)],
                [$this->equalTo(':old_date_menu'), $this->equalTo($old_date_menu)],
                [$this->equalTo(':new_date_menu'), $this->equalTo($new_date_menu)]
            );

        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert that the update was successful
        $result = $this->modelMenu->updateMenu($id_plat, $old_date_menu, $new_date_menu);
        $this->assertTrue($result, "Plat mis à jour dans le menu avec succès.");
    }

    public function testDeleteMenu()
    {
        $id_plat = 'plat001';
        $date_menu = '2024-10-08';

        // Mock the prepare method for deleteMenu
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo('DELETE FROM menu WHERE id_plat = :id_plat AND date_menu = :date_menu'))
            ->willReturn($this->mockStmt);

        // Mock the bindParam and execute methods
        $this->mockStmt->expects($this->exactly(2))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_plat'), $this->equalTo($id_plat)],
                [$this->equalTo(':date_menu'), $this->equalTo($date_menu)]
            );

        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert that the deletion was successful
        $result = $this->modelMenu->deleteMenu($id_plat, $date_menu);
        $this->assertTrue($result, "Plat supprimé du menu avec succès.");
    }
}
