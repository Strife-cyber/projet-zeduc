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

        $sql = "SELECT * FROM gerant g LEFT JOIN utilisateur u ON g.id_gerant = u.id";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        $gerants = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($gerants as $gerant) {
            if($gerant['email'] == $email && $gerant['secret'] == $password) {
                return $gerant;
            }
        }

        $sql = "SELECT * FROM admin a LEFT JOIN utilisateur u ON a.id_admin = u.id";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($admins as $admin) {
            if($admin['email'] == $email && $admin['secret'] == $password) {
                return $admin;
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

    public function insertCommande($id_commande, $id_client, $id_plat, $date_commande){
        $sql = "INSERT INTO commande (id_commande, id_client, id_plat, date_commande, status) VALUES (:id_commande, :id_client, :id_plat, :date_commande, :status)";
        $status = false;

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id_commande', $id_commande);
        $stmt->bindParam(':id_client', $id_client);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':date_commande', $date_commande);
        $stmt->bindParam(':status', $status, PDO::PARAM_BOOL);

        $stmt->execute();
        return 'Insertion reussi';
    }

    public function insertQuestion($user_id, $question, $answer) : string {
        $sql = "INSERT INTO security_questions (user_id, question, answer) VALUES (:user_id, :question, :answer)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':answer', $answer);

        $stmt->execute();
        return 'Insertion reussi';
    }

    public function getQuestion($email) {
        // Prepare the first SQL query to get the user ID based on the provided email
        $idQuery = "SELECT id FROM utilisateur WHERE email = :email";
        $stmt = $this->connexion->prepare($idQuery);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        // Fetch the user ID
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if user exists
        if (!$user) {
            return []; // Return an empty array if the user is not found
        }

        // Get the user ID
        $userId = $user['id'];

        // Prepare the second SQL query to get the security questions for the user
        $sql = "SELECT * FROM security_questions WHERE user_id = :id";
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        // Fetch and return the security questions
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getToken($email){
        $sql = "SELECT * FROM request_password_reset(:email)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':email', $email);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function reset($token, $password){
        $sql = "SELECT reset_password(:token, :password)";

        $stmt = $this->connexion->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':password', $password);

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function meilleur(){
        $sql = "SELECT * FROM get_top_10_clients()";

        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}