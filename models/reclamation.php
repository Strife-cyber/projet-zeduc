<?php

include_once 'config.php';

class ModelReclamation {
    private $connexion;

    public function __construct() {
        $this->connexion = Database::getInstance()->getConnection();
    }

    // Insertion d'une reclamation
    public  function insererReclamation($id_reclamation, $id_client, $description, $date_reclamation, $statut){
        $sql = "INSERT INTO Reclamation (id_reclamation, id_client, description, date_reclamation, statut) VALUES (:id_reclamation, :id_client, :description, :date_reclamation, :statut)";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_reclamation', $id_reclamation);
        $stmt->bindParam(':id_client', $id_client);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':date_reclamation', $date_reclamation);
        $stmt->bindParam(':statut', $statut);

        return $stmt->execute();
    }

    // Methode pour obtenir une reclamation precisent par son id
    public function getReclamationById($id_reclamation){
        $sql = "SELECT * FROM Reclamation  WHERE id_reclamation = :id_reclamation";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_reclamation', $id_reclamation);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Methode pour obtenir toute les reclamations
    public function getAllReclamations(){
        $sql = "SELECT * FROM Reclamation";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function solveReclamation($id_reclamation){
        $sql = "UPDATE Reclamation SET statut = TRUE WHERE id_reclamation = :id_reclamation";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_reclamation', $id_reclamation);
        return $stmt->execute();
    }
}

function testInsererReclamation(){
    $modelReclamation = new ModelReclamation();
    $result = $modelReclamation->insererReclamation('REC001', 'user001', 'Teste Reclamation', '2024-10-08', 'False');
    echo $result;
}

function testgetAllReclamations(){
    $modelReclamation = new ModelReclamation();
    $result = $modelReclamation->getAllReclamations();
    echo $result;
}

function testgetReclamationById(){
    $modelReclamation = new ModelReclamation();
    $result = $modelReclamation->getReclamationById("REC001");
    echo $result;
}

function testUpdateReclamation(){
    $modelReclamation = new ModelReclamation();
    $modelReclamation->solveReclamation("REC001");
    echo $modelReclamation->getReclamationById("REC001");
}

if (php_sapi_name() == "cli") {
    testInsererReclamation();
    testgetAllReclamations();
    testgetReclamationById();
    testupdateReclamation();
}