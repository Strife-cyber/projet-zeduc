<?php

include_once 'config.php';

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
        $stmt->bindParam(':nom', $nom);  // Correction du paramètre bindé 'name' à 'nom'
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

        return "Employer ajouté";
    }

    public function getEmployer(){
        $sql = "SELECT * FROM employer e LEFT JOIN utilisateur u ON e.id_employer = u.id";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        // Récupérer toutes les lignes en tant que tableau associatif
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEmployerById($id) {
        $sql = "SELECT * FROM employer e LEFT JOIN utilisateur u ON e.id_employer = u.id WHERE e.id_employer = :id";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);  // Récupérer une seule ligne
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

        return "Employer supprimé";
    }
}

// Fonctions de test
function testCreateEmployer() {
    $modelemployer = new ModelEmployer();
    $result = $modelemployer->createEmployer(1, "John Doe", "john@example.com", "secret123", "user003");
    echo $result . "<br>";
}

function testGetEmployer() {
    $modelemployer = new ModelEmployer();
    $employers = $modelemployer->getEmployer();
    foreach ($employers as $employer) {
        echo "ID: " . $employer['id_employer'] . " - Nom: " . $employer['nom'] . " - Email: " . $employer['email'] . " - Admin: " . $employer['admin'] . "<br>";
    }
}

function testGetEmployerById() {
    $modelemployer = new ModelEmployer();
    $employer = $modelemployer->getEmployerById(1); // Remplacez 1 par l'ID d'un employé existant
    if ($employer) {
        echo "ID: " . $employer['id_employer'] . " - Nom: " . $employer['nom'] . " - Email: " . $employer['email'] . " - Admin: " . $employer['admin'] . "<br>";
    } else {
        echo "Aucun employé trouvé avec cet ID.<br>";
    }
}

function testDeleteEmployer() {
    $modelemployer = new ModelEmployer();
    $result = $modelemployer->deleteEmployer(1); // Remplacez 1 par l'ID de l'employé à supprimer
    echo $result . "<br>";
}

// Appel des fonctions de test
// testCreateEmployer();
// testGetEmployer();
// testGetEmployerById();
// testDeleteEmployer();
