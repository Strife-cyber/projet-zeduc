<?php

include_once 'models/admin.php';

class AdminController {
    private $admin;

    public function __construct() {
        $this->admin = new ModelAdmin(); // Fixed: Should be instance of ModelAdmin, not AdminController
    }

    public function insertEvenement($id, $title, $description, $jeux){
        return $this->admin->insertEvenement($id, $title, $description, $jeux);
    }

    public function insertPromotion($id_promotion, $id_admin, $debut, $fin, $description){
        return $this->admin->insertPromotion($id_promotion, $id_admin, $debut, $fin, $description);
    }

    // Method to get all evenements
    public function getAllEvenements() {
        return $this->admin->getAllEvenements();
    }

    // Method to delete an evenement by ID
    public function deleteEvenementById($id) {
        return $this->admin->deleteEvenementById($id);
    }

    // Method to get all promotions
    public function getAllPromotions() {
        return $this->admin->getAllPromotions();
    }

    // Method to delete a promotion by ID
    public function deletePromotionById($id_promotion) {
        return $this->admin->deletePromotionById($id_promotion);
    }
}
