<?php

include_once 'config.php';

class Gerant {
    private $connexion;

    public function __construct() {
        $this->connexion = Database::getInstance()->getConnection();
    }

    public function getEmployer(){
        $sql = "SELECT * FROM employer e JOIN utilisateur u ON e.id_employer = u.id";

        $stmt = $this->connexion->prepare($sql);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}