<?php

include_once 'config.php';
include_once './parameters/parameters.php';

class ModelClient {
    private $connexion;

    public function __construct() {
        $this->connexion = Database::getInstance()->getConnection();
    }

    public function createClient($id, $nom, $email, $secret){
        $users = $this->getAllClients();

        foreach($users as $user){
            if($user['email'] == $email){
                return null;
            }
        }
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
// code_parrain code_domain, id VARCHAR, points_ajouter INT

    public function parrainage($code, $id){
        $parrain = getParametre()->getParrain();
        $sql = "SELECT ajouter_parrain(:id_client, :code, :points_parrain)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':id_client', $id);
        $stmt->bindParam(':points_parrain', $parrain);

        $stmt->execute();
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

    public function viewMenu($date){
        $sql = "SELECT menu_du_jour(:date)";

        $stmt = $this->connexion->prepare($sql);

        $stmt->bindParam(':date', $date);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCommads($id, $date){
        $sql = "SELECT commande_utilisateur_jour(:id_du_client, :date)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_du_client', $id);
        $stmt->bindParam(':date', $date);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fiole($id){
        $sql = "SELECT * FROM get_fiole(:id)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id', $id);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}