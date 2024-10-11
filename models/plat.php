<?php

include_once 'config.php';

class ModelPlat {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    // Méthode pour insérer un plat dans la base de données avec un chemin d'image
    private function insererPlat($id, $imagePath, $nom, $prix){
        $sql = "INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':image', $imagePath); // Enregistrement du chemin de l'image
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);
        return $stmt->execute();
    }

    // Créer une nouvelle entrée de plat avec un chemin d'image
    public function createPlat($id, $imagePath, $nom, $prix){
        return $this->insererPlat($id, $imagePath, $nom, $prix);
    }

    // Récupérer un plat par son ID
    public function getPlatById($id){
        $sql = "SELECT * FROM plat WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Récupérer tous les plats
    public function getAllPlats(){
        $sql = "SELECT * FROM plat";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Mettre à jour un plat avec un nouveau chemin d'image (facultatif) et de nouveaux détails
    public function updatePlat($id, $imagePath, $nom, $prix){
        $sql = "UPDATE plat SET nom = :nom, prix = :prix WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);

        if ($stmt->execute()) {
            // Si un nouveau chemin d'image est fourni, mettre à jour l'image
            if ($imagePath) {
                $this->updateImagePath($id, $imagePath);
            }
            return true;
        }
        return false;
    }

    // Mettre à jour le chemin de l'image dans la base de données
    private function updateImagePath($id, $imagePath){
        $sql = "UPDATE plat SET image = :image WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':image', $imagePath); // Mise à jour du chemin de l'image
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Supprimer un plat par son ID
    public function deletePlat($id){
        $sql = "DELETE FROM plat WHERE id_plat = :id";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}

// Fonctions de test

function testCreatePlat() {
    $modelPlat = new ModelPlat();
    // Chemin complet vers l'image
    $imagePath = 'uploads/image/IMG-20240919-WA0006.jpg';
    $result = $modelPlat->createPlat(1, $imagePath, "Pizza Margherita", 1000);
    echo $result ? "Plat ajouté avec succès.<br>" : "Échec de l'ajout du plat.<br>";
}

function testGetPlatById() {
    $modelPlat = new ModelPlat();
    $plat = $modelPlat->getPlatById(1); // Remplacez 1 par un ID valide
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
    $imagePath = 'uploads/image/IMG-20240919-WA0006.jpg';
    $result = $modelPlat->updatePlat(1, $imagePath, "Pizza Margherita", 1200);
    echo $result ? "Plat mis à jour avec succès.<br>" : "Échec de la mise à jour du plat.<br>";
}

function testDeletePlat() {
    $modelPlat = new ModelPlat();
    $result = $modelPlat->deletePlat(1); // Remplacez 1 par un ID valide
    echo $result ? "Plat supprimé avec succès.<br>" : "Échec de la suppression du plat.<br>";
}

// Exécutez les fonctions de test

if (php_sapi_name() == 'cli') {
    testCreatePlat();
    testGetPlatById();
    testGetAllPlats();
    testUpdatePlat();
    testDeletePlat();
}
