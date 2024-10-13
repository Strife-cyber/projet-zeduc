<?php

include_once 'config.php';

class ModelEmployer {
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    // Récupérer les commandes à une date donnée
    public function getCommande($date) {
        $sql = "SELECT c.id_commande, u.nom AS client_nom, p.nom AS plat_nom, c.status, p.prix 
                FROM commande c 
                JOIN utilisateur u ON c.id_client = u.id
                JOIN plat p ON c.id_plat = p.id_plat
                WHERE date_commande = :date";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Mettre à jour le statut d'une commande
    public function updateCommande($id) {
        $sql = "UPDATE commande SET status = true WHERE id_commande = :id";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return 'Commande complétée';
    }

    // Insérer un menu
    public function insererMenu($idPlat, $dateMenu) {
        $sql = "INSERT INTO menu (id_plat, date_menu) VALUES (:id_plat, :date_menu)";
        $stmt = $this->connection->prepare($sql);

        try {
            $stmt->execute([':id_plat' => $idPlat, ':date_menu' => $dateMenu]);
            return ['message' => 'true'];
        } catch (PDOException $e) {
            // Gérer l'erreur ici
            if ($e->getCode() == 23505) { // Code d'erreur pour violation de clé unique
                return ['message' => 'false'];
            }
            return ['message' => 'false'];
        }
    }

    // Supprimer un menu
    public function delMenu($id, $date) {
        $sql = "DELETE FROM menu WHERE id_plat = :id AND date_menu = :date";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':date', $date);

        if ($stmt->execute()) {
            return ['message' => 'true'];
        } else {
            return ['message' => 'false'];
        }
    }

    // Récupérer tous les plats
    public function getPlat() {
        $sql = "SELECT * FROM plat";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Parcourir les résultats et encoder chaque image en base64
        foreach ($results as &$row) {
            $imagePath = $row['image'];
            if (file_exists($imagePath)) {
                $imageData = file_get_contents($imagePath);
                $row['image'] = 'data:image/jpeg;base64,' . base64_encode($imageData);
            } else {
                $row['image'] = null; // Set to null if image doesn't exist
            }
        }

        return $results;
    }

    // Récupérer le menu du jour
    public function getMenu($date) {
        $sql = "SELECT * FROM menu_du_jour(:date)";

        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Encoder chaque image en base64
        foreach ($results as &$row) {
            $imagePath = $row['image'];
            if (file_exists($imagePath)) {
                $imageData = file_get_contents($imagePath);
                $row['image'] = 'data:image/jpeg;base64,' . base64_encode($imageData);
            } else {
                $row['image'] = null; // Handle absence of image
            }
        }

        return $results;
    }

    // Insérer un plat avec une image
    public function insererPlat($id, $image, $nom, $prix) {
        $uploadDir = 'uploads/images/' . $id . '/';

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Create a unique image name to avoid overwriting
        $imageName = basename($image['name']);
        $imagePath = $uploadDir . $imageName;

        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            $sql = "INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':image', $imagePath);
            $stmt->bindParam(':nom', $nom);
            $stmt->bindParam(':prix', $prix);

            if ($stmt->execute()) {
                return ['message' => 'true'];
            } else {
                return ['message' => 'false'];
            }
        } else {
            return ['message' => 'false'];
        }
    }
}
