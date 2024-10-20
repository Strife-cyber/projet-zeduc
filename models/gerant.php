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

    public function insertEmployer($id, $nom, $email, $password, $date){
        $sql = "INSERT INTO utilisateur (id, nom, email, secret) VALUES (:id, :nom, :email, :password)";
        $sql2 = "INSERT INTO employer (id_employer, date_embauche) VALUES (:id, :date)";

        $stmt = $this->connexion->prepare($sql);
        $stmt2 = $this->connexion->prepare($sql2);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        $stmt2->bindParam(':id', $id);
        $stmt2->bindParam(':date', $date);

        $stmt->execute();
        $stmt2->execute();

        return 'Insertion reussie';
    }

    public function deleteEmployer($id){
        $sql = "DELETE FROM employer WHERE id_employer = :id";
        $sql2 = "DELETE FROM utilisateur WHERE  id = :id";

        $stmt = $this->connexion->prepare($sql);
        $stmt2 = $this->connexion->prepare($sql2);

        $stmt->bindParam(':id', $id);
        $stmt2->bindParam(':id', $id);

        $stmt->execute();
        $stmt2->execute();

        return 'Suppression reussie';
    }
}