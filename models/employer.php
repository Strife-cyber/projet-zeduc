<?php
class ModelEmployer {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    public function createEmployer($id, $nom, $email, $secret, $admin){
        $sql = "INSERT INTO utilisateur (id, nom, email, secret) VALUES (:id, :nom, :email, :secret)";
        $sql2 = "INSERT INTO employer (id_employer, admin) VALUES (:id, :admin)";

        $stmt = $this->connection->prepare($sql);
        $stmt2 = $this->connection->prepare($sql2);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $nom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':secret', $secret);

        $stmt2->bindParam(':id', $id);
        $stmt2->bindParam(':admin', $admin);

        try{
            $stmt->execute();
            $stmt2->execute();
        } catch(Exception $e){
            return $e->getMessage();
        }

        return "Employer Ajouter";
    }

    public function getEmployer(){
        $sql = "SELECT * FROM employer e LEFT JOIN utilisateur u on e.id_employer = u.id";

        $stmt = $this->connection->prepare($sql);

        return $stmt->execute();
    }

    public function getEmployerById($id){
        $sql = "SELECT 1 FROM employer e LEFT JOIN utilisateur u on e.id_employer = u.id WHERE u.id = :id";
        
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    public function deleteEmployer($id){
        $sql = "DELETE FROM employer WHERE id_employer = :id";
        $sql2 = "DELETE FROM utilisateur WHERE id = :id";

        $stmt = $this->connection->prepare($sql);
        $stmt2 = $this->connection->prepare($sql2);

        $stmt->bindParam(':id', $id);
        $stmt2->bindParam(':id', $id);

        try {
            $stmt->execute();
            $stmt2->execute();
        } catch (Exception $e) {
            return $e->getMessage();
        }

        return "Employer Supprimer";
    }
}