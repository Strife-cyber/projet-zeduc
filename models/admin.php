<?php

include_once 'config.php';

class ModelAdmin {
    private $connexion;

    public function __construct() {
        $this->connexion = Database::getInstance()->getConnection();
    }

    public function insertEvenement($id, $title, $description, $jeux) {
        $sql = "INSERT INTO evenements(id_evenement, title, description, jeux) VALUES (:id_evenement, :title, :description, :jeux)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_evenement', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':jeux', $jeux);

        $stmt->execute();
        return "Nouvelle evenement";
    }

    public function insertPromotion($id_promotion, $id_admin, $debut, $fin, $description) {
        $sql = "INSERT INTO promotion(id_promotion, id_admin, date_debut, date_fin, description) VALUES (:id_promotion, :id_admin, :date_debut, :date_fin, :description)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        $stmt->bindParam(':id_admin', $id_admin);
        $stmt->bindParam(':date_debut', $debut);
        $stmt->bindParam(':date_fin', $fin);
        $stmt->bindParam(':description', $description);

        $stmt->execute();
        return "Nouvelle promotion";
    }

    // Method to get all evenements
    public function getAllEvenements() {
        $sql = "SELECT * FROM evenements";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Method to delete an evenement by ID
    public function deleteEvenementById($id) {
        $sql = "DELETE FROM evenements WHERE id_evenement = :id_evenement";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_evenement', $id);
        $stmt->execute();
        return "Evenement supprimé";
    }

    // Method to get all promotions
    public function getAllPromotions() {
        $sql = "SELECT * FROM promotion";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Method to delete a promotion by ID
    public function deletePromotionById($id_promotion) {
        $sql = "DELETE FROM promotion WHERE id_promotion = :id_promotion";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_promotion', $id_promotion);
        $stmt->execute();
        return "Promotion supprimée";
    }
}
