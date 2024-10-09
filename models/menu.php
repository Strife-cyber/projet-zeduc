<?php

include_once 'config.php';

class ModelMenu {
    private $connection;

    public function __construct() {
        $this->connection = Database::getInstance()->getConnection();
    }

    // Méthode pour insérer un plat dans le menu
    public function insererMenu($id_plat, $date_menu) {
        $sql = "INSERT INTO menu (id_plat, date_menu) VALUES (:id_plat, :date_menu)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':date_menu', $date_menu);
        return $stmt->execute();
    }

    // Méthode pour obtenir un plat du menu par son ID et sa date
    public function getMenuByPlatAndDate($id_plat, $date_menu) {
        $sql = "SELECT * FROM menu WHERE id_plat = :id_plat AND date_menu = :date_menu";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':date_menu', $date_menu);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Méthode pour obtenir tous les plats du menu
    public function getAllMenus() {
        $sql = "SELECT * FROM menu";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode pour mettre à jour un plat dans le menu
    public function updateMenu($id_plat, $old_date_menu, $new_date_menu) {
        $sql = "UPDATE menu SET date_menu = :new_date_menu WHERE id_plat = :id_plat AND date_menu = :old_date_menu";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':old_date_menu', $old_date_menu);
        $stmt->bindParam(':new_date_menu', $new_date_menu);
        return $stmt->execute();
    }

    // Méthode pour supprimer un plat du menu
    public function deleteMenu($id_plat, $date_menu) {
        $sql = "DELETE FROM menu WHERE id_plat = :id_plat AND date_menu = :date_menu";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':date_menu', $date_menu);
        return $stmt->execute();
    }
}

// Fonctions de test

function testInsererMenu() {
    $modelMenu = new ModelMenu();
    $result = $modelMenu->insererMenu('plat001', date('Y-m-d'));
    echo $result ? "Plat ajouté au menu avec succès.<br>" : "Échec de l'ajout du plat au menu.<br>";
}

function testGetMenuByPlatAndDate() {
    $modelMenu = new ModelMenu();
    $menu = $modelMenu->getMenuByPlatAndDate('plat001', date('Y-m-d')); // Remplacez PLAT001 et la date par des valeurs valides
    if ($menu) {
        echo "Plat trouvé : ID Plat: " . $menu['id_plat'] . " - Date: " . $menu['date_menu'] . "<br>";
    } else {
        echo "Aucun plat trouvé avec cet ID et cette date.<br>";
    }
}

function testGetAllMenus() {
    $modelMenu = new ModelMenu();
    $menus = $modelMenu->getAllMenus();
    foreach ($menus as $menu) {
        echo "ID Plat: " . $menu['id_plat'] . " - Date: " . $menu['date_menu'] . "<br>";
    }
}

function testUpdateMenu() {
    $modelMenu = new ModelMenu();
    $result = $modelMenu->updateMenu('plat001', '2024-10-08', '2024-10-09'); // Remplacez par des valeurs valides
    echo $result ? "Plat mis à jour dans le menu avec succès.<br>" : "Échec de la mise à jour du plat dans le menu.<br>";
}

function testDeleteMenu() {
    $modelMenu = new ModelMenu();
    $result = $modelMenu->deleteMenu('plat001', '2024-10-08'); // Remplacez par des valeurs valides
    echo $result ? "Plat supprimé du menu avec succès.<br>" : "Échec de la suppression du plat du menu.<br>";
}

// Exécuter les fonctions de test
if (php_sapi_name() == 'cli') {
    testInsererMenu();
    testGetMenuByPlatAndDate();
    testGetAllMenus();
    testUpdateMenu();
    testDeleteMenu();
}
