<?php

include_once 'config.php';

class ModelPlat {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    // Method to insert a dish into the database with image as byte array
    private function insererPlat($id, $imageData, $nom, $prix){
        $sql = "INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB); // Use PDO::PARAM_LOB to handle binary data
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);
        return $stmt->execute();
    }

    // Method to read the image file as a byte array
    private function getImageAsByteArray($imagePath) {
        return file_get_contents($imagePath); // Reads the file as binary data
    }

    // Creates a new dish entry with the image stored as byte array
    public function createPlat($id, $imagePath, $nom, $prix){
        $imageData = $this->getImageAsByteArray($imagePath);
        return $this->insererPlat($id, $imageData, $nom, $prix);
    }

    // Retrieve a dish by its ID
    public function getPlatById($id){
        $sql = "SELECT * FROM plat WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Retrieve all dishes
    public function getAllPlats(){
        $sql = "SELECT * FROM plat";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update a dish with a new image (optional) and new details
    public function updatePlat($id, $imagePath, $nom, $prix){
        $sql = "UPDATE plat SET nom = :nom, prix = :prix WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);

        if ($stmt->execute()) {
            // If a new image is provided, update the image
            if ($imagePath) {
                $imageData = $this->getImageAsByteArray($imagePath);
                $this->updateImageData($id, $imageData);
            }
            return true;
        }
        return false;
    }

    // Update the image data in the database
    private function updateImageData($id, $imageData){
        $sql = "UPDATE plat SET image = :image WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB); // Use PDO::PARAM_LOB for binary data
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Delete a dish by its ID
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
    // Chemin complet vers l'image
    $imagePath = 'C:/Users/Strife-Cyber/Desktop/Zeduc/zeduc-space/src/assets/IMG-20240919-WA0006.jpg';
    $result = $modelPlat->createPlat(1, $imagePath, "Pizza Margherita", 1000);
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
    $imagePath = 'C:/Users/Strife-Cyber/Desktop/Zeduc/zeduc-space/src/assets/IMG-20240919-WA0006.jpg';
    $result = $modelPlat->updatePlat(1, $imagePath, "Pizza Margherita", 1200);
    echo $result ? "Plat mis à jour avec succès.<br>" : "Échec de la mise à jour du plat.<br>";
}

function testDeletePlat() {
    $modelPlat = new ModelPlat();
    $result = $modelPlat->deletePlat(1); // Replace 1 with a valid ID
    echo $result ? "Plat supprimé avec succès.<br>" : "Échec de la suppression du plat.<br>";
}

// Execute test functions

if (php_sapi_name() == 'cli') {
    testCreatePlat();
    testGetPlatById();
    testGetAllPlats();
    testUpdatePlat();
    testDeletePlat();
}
