<?php

include_once 'config.php';

class ModelClient {
    private $connexion;

    public function __construct() {
        $this->connexion = Database::getInstance()->getConnection();
    }

    public function createClient($id, $nom, $email, $secret){
        $sql = "SELECT inscrire_client(:id_client, :nom_client, :email_client, :secret_client)";

        $stmt = $this->connexion->prepare($sql);

        $stmt->bindParam(':id_client', $id);
        $stmt->bindParam(':nom_client', $nom);
        $stmt->bindParam(':email_client', $email);
        $stmt->bindParam(':secret_client', $secret);

        return $stmt->execute();
    }

    public function getClientById($id){
        $sql = "SELECT * FROM client c LEFT JOIN utilisateur u  ON c.id_client == u.id WHERE u.id = :id";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    public function getAllClients(){
        $sql = "SELECT * FROM client c LEFT JOIN utilisateur u  ON c.id_client = u.id";
        $stmt = $this->connexion->prepare($sql);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function connexion($email, $password){
        $users = $this->getAllClients();
        foreach($users as $user){
            if($user['email'] == $email && $user['secret'] == $password){
                return $user;
            }
        }
        return null;
    }
}