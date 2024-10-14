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

        $sql = "SELECT * FROM employer e LEFT JOIN utilisateur u ON e.id_employer = u.id";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        $employers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($employers as $employer) {
            if($employer['email'] == $email && $employer['secret'] == $password){
                return $employer;
            }
        }
        return null;
    }

    public function viewMenu($date){
        // Accédez directement aux colonnes retournées par la fonction
        $sql = "SELECT * FROM menu_du_jour(:date)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Parcourir les résultats et encoder chaque image à partir du chemin d'accès
        foreach ($results as &$row) {
            $imagePath = $row['image'];
            if (file_exists($imagePath)) {
                // Lire le fichier et encoder en base64
                $imageData = file_get_contents($imagePath);
                $row['image'] = 'data:image/jpeg;base64,' . base64_encode($imageData);
            } else {
                // Gérer l'absence de fichier d'image
                $row['image'] = null;
            }
        }

        return $results;
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

    public function historique($id){
        $sql = "SELECT * FROM historique(:id)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id', $id);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function promotion(){
        $sql = "SELECT * FROM promotion ORDER BY date_debut DESC";

        $stmt = $this->connexion->prepare($sql);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertreclamation($reclamation, $client, $description, $date_reclamation) {
        // Statut de réclamation : initialisé à 'false' (reclamation non traitée)
        $status = false;

        $sql = "INSERT INTO Reclamation (id_reclamation, id_client, description, date_reclamation, statut)
            VALUES (:reclamation, :client, :description, :date_reclamation, :statut)";

        $stmt = $this->connexion->prepare($sql);

        // Lier les paramètres avec leurs valeurs correspondantes
        $stmt->bindParam(':reclamation', $reclamation);
        $stmt->bindParam(':client', $client);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':date_reclamation', $date_reclamation);

        // Utilisation explicite du type boolean pour le paramètre 'statut'
        $stmt->bindParam(':statut', $status, PDO::PARAM_BOOL);

        // Exécution de la requête
        $stmt->execute();

        return 'Reclamation deposée avec succès';
    }


    public function getReclamation($id){
        $sql = "SELECT * FROM Reclamation WHERE id_client = :id";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id', $id);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}