<?php

include_once 'config.php';

class ModelPromotion {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    // Fonction pour insérer une nouvelle promotion
    public function insererPromotion($id_promotion, $id_admin, $date_debut, $date_fin, $description){
        $sql = "INSERT INTO promotion (id_promotion, id_admin, date_début, date_fin, description) 
                VALUES (:id_promotion, :id_admin, :date_debut, :date_fin, :description)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        $stmt->bindParam(':id_admin', $id_admin);
        $stmt->bindParam(':date_debut', $date_debut);
        $stmt->bindParam(':date_fin', $date_fin);
        $stmt->bindParam(':description', $description);
        return $stmt->execute();
    }

    // Fonction pour obtenir une promotion par son ID
    public function getPromotionById($id_promotion){
        $sql = "SELECT * FROM promotion WHERE id_promotion = :id_promotion";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Fonction pour obtenir toutes les promotions
    public function getAllPromotions(){
        $sql = "SELECT * FROM promotion";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Fonction pour mettre à jour une promotion
    public function updatePromotion($id_promotion, $id_admin, $date_debut, $date_fin, $description){
        $sql = "UPDATE promotion SET id_admin = :id_admin, date_début = :date_debut, date_fin = :date_fin, 
                description = :description WHERE id_promotion = :id_promotion";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        $stmt->bindParam(':id_admin', $id_admin);
        $stmt->bindParam(':date_debut', $date_debut);
        $stmt->bindParam(':date_fin', $date_fin);
        $stmt->bindParam(':description', $description);
        return $stmt->execute();
    }

    // Fonction pour supprimer une promotion
    public function deletePromotion($id_promotion){
        $sql = "DELETE FROM promotion WHERE id_promotion = :id_promotion";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        return $stmt->execute();
    }
}

// Fonctions de test

function testCreatePromotion() {
    $modelPromotion = new ModelPromotion();
    $result = $modelPromotion->insererPromotion('promo004', 'user003', '2024-10-01', '2024-10-31', 'Promo d\'Halloween');
    echo $result ? "Promotion ajoutée avec succès.<br>" : "Échec de l'ajout de la promotion.<br>";
}

function testGetPromotionById() {
    $modelPromotion = new ModelPromotion();
    $promotion = $modelPromotion->getPromotionById('promo004'); // Remplacez avec un ID valide
    if ($promotion) {
        echo "Promotion trouvée : ID: " . $promotion['id_promotion'] . " - Admin: " . $promotion['id_admin'] .
            " - Date début: " . $promotion['date_début'] . " - Date fin: " . $promotion['date_fin'] .
            " - Description: " . $promotion['description'] . "<br>";
    } else {
        echo "Aucune promotion trouvée avec cet ID.<br>";
    }
}

function testGetAllPromotions() {
    $modelPromotion = new ModelPromotion();
    $promotions = $modelPromotion->getAllPromotions();
    foreach ($promotions as $promotion) {
        echo "ID: " . $promotion['id_promotion'] . " - Admin: " . $promotion['id_admin'] .
            " - Date début: " . $promotion['date_début'] . " - Date fin: " . $promotion['date_fin'] .
            " - Description: " . $promotion['description'] . "<br>";
    }
}

function testUpdatePromotion() {
    $modelPromotion = new ModelPromotion();
    $result = $modelPromotion->updatePromotion('promo004', 'user003', '2024-10-01', '2024-11-01', 'Promo prolongée');
    echo $result ? "Promotion mise à jour avec succès.<br>" : "Échec de la mise à jour de la promotion.<br>";
}

function testDeletePromotion() {
    $modelPromotion = new ModelPromotion();
    $result = $modelPromotion->deletePromotion('promo004'); // Remplacez par un ID valide
    echo $result ? "Promotion supprimée avec succès.<br>" : "Échec de la suppression de la promotion.<br>";
}

// Exécution des fonctions de test

if (php_sapi_name() == 'cli') {
    testCreatePromotion();
    testGetPromotionById();
    testGetAllPromotions();
    testUpdatePromotion();
    testDeletePromotion();
}
