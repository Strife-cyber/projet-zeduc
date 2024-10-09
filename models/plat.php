<?php

include_once 'config.php';

class ModelPlat {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    private function insererPlat($id, $path, $nom, $prix){
        $sql = "INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':image', $path);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);
        return $stmt->execute();
    }

    private function saveImage($imagePath, $path, $nom){
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
        $targetFile = $path . '/' . basename($nom);
        return copy($imagePath, $targetFile); // Use copy to handle the image
    }

    public function createPlat($id, $imagePath, $nom, $prix){
        $path = 'uploads/images/' . basename($nom);
        if ($this->saveImage($imagePath, 'uploads/images', $nom)) {
            return $this->insererPlat($id, $path, $nom, $prix);
        }
        return false;
    }

    public function getPlatById($id){
        $sql = "SELECT * FROM plat WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllPlats(){
        $sql = "SELECT * FROM plat";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updatePlat($id, $imagePath, $nom, $prix){
        $sql = "UPDATE plat SET nom = :nom, prix = :prix WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);

        if ($stmt->execute()) {
            // If a new image is provided, update the image
            if ($imagePath) {
                $path = 'uploads/images/' . basename($nom);
                $this->saveImage($imagePath, 'uploads/images', $nom);
                // Update the image path in the database
                $this->updateImagePath($id, $path);
            }
            return true;
        }
        return false;
    }

    private function updateImagePath($id, $path){
        $sql = "UPDATE plat SET image = :image WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':image', $path);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function deletePlat($id){
        $sql = "DELETE FROM plat WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}

// Test Functions

function testCreatePlat() {
    $modelPlat = new ModelPlat();
    $imagePath = 'C:/Users/Strife-Cyber/Desktop/Zeduc/zeduc-space/src/assets/IMG-20240919-WA0006.jpg'; // Replace with the actual path to your image
    $result = $modelPlat->createPlat(1, $imagePath, "Plat Test", 1000);
    echo $result ? "Plat ajouté avec succès.<br>" : "Échec de l'ajout du plat.<br>";
}

function testGetPlatById() {
    $modelPlat = new ModelPlat();
    $plat = $modelPlat->getPlatById(1); // Replace 1 with a valid ID
    if ($plat) {
        echo "Plat trouvé : ID: " . $plat['id_plat'] . " - Nom: " . $plat['nom'] . " - Prix: " . $plat['prix'] . "<br>";
    } else {
        echo "Aucun plat trouvé avec cet ID.<br>";
    }
}

function testGetAllPlats() {
    $modelPlat = new ModelPlat();
    $plats = $modelPlat->getAllPlats();
    foreach ($plats as $plat) {
        echo "ID: " . $plat['id_plat'] . " - Nom: " . $plat['nom'] . " - Prix: " . $plat['prix'] . "<br>";
    }
}

function testUpdatePlat() {
    $modelPlat = new ModelPlat();
    $imagePath = 'C:/Users/Strife-Cyber/Desktop/Zeduc/zeduc-space/src/assets/IMG-20240919-WA0006.jpg'; // Replace with a valid image path
    $result = $modelPlat->updatePlat(1, $imagePath, "Plat Mis à Jour", 1200); // Replace 1 with a valid ID
    echo $result ? "Plat mis à jour avec succès.<br>" : "Échec de la mise à jour du plat.<br>";
}

function testDeletePlat() {
    $modelPlat = new ModelPlat();
    $result = $modelPlat->deletePlat(1); // Replace 1 with a valid ID
    echo $result ? "Plat supprimé avec succès.<br>" : "Échec de la suppression du plat.<br>";
}

// Execute test functions
/*
if (php_sapi_name() == 'cli') {
    testCreatePlat();
    testGetPlatById();
    testGetAllPlats();
    testUpdatePlat();
    testDeletePlat();
}
 */
