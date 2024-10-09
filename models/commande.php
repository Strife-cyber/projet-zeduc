<?php

include_once 'config.php';

class ModelCommande {
    private $connection;

    public function __construct() {
        $this->connection = Database::getInstance()->getConnection();
    }

    // Méthode pour insérer une nouvelle commande
    public function insererCommande($id_commande, $id_client, $id_plat, $date_commande, $status) {
        $sql = "INSERT INTO commande (id_commande, id_client, id_plat, date_commande, status) VALUES (:id_commande, :id_client, :id_plat, :date_commande, :status)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_commande', $id_commande);
        $stmt->bindParam(':id_client', $id_client);
        $stmt->bindParam(':id_plat', $id_plat);
        $stmt->bindParam(':date_commande', $date_commande);
        $stmt->bindParam(':status', $status);
        return $stmt->execute();
    }

    // Méthode pour obtenir une commande par son ID
    public function getCommandeById($id_commande) {
        $sql = "SELECT * FROM commande WHERE id_commande = :id_commande";
        $stmt = $this->connection->prepare($sql);
        $stmt->bindParam(':id_commande', $id_commande);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Méthode pour obtenir toutes les commandes
    public function getAllCommandes() {
        $sql = "SELECT * FROM commande";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

// Fonctions de test

function testInsererCommande() {
    $modelCommande = new ModelCommande();
    $result = $modelCommande->insererCommande('CMD001', 'user001', 'plat001', date('Y-m-d'), true);
    echo $result ? "Commande ajoutée avec succès.<br>" : "Échec de l'ajout de la commande.<br>";
}

function testGetCommandeById() {
    $modelCommande = new ModelCommande();
    $commande = $modelCommande->getCommandeById('CMD001'); // Remplacez CMD001 par un ID valide
    if ($commande) {
        echo "Commande trouvée : ID: " . $commande['id_commande'] . " - Client: " . $commande['id_client'] . " - Plat: " . $commande['id_plat'] . " - Date: " . $commande['date_commande'] . " - Status: " . ($commande['status'] ? 'Livrée' : 'En cours') . "<br>";
    } else {
        echo "Aucune commande trouvée avec cet ID.<br>";
    }
}

function testGetAllCommandes() {
    $modelCommande = new ModelCommande();
    $commandes = $modelCommande->getAllCommandes();
    foreach ($commandes as $commande) {
        echo "ID: " . $commande['id_commande'] . " - Client: " . $commande['id_client'] . " - Plat: " . $commande['id_plat'] . " - Date: " . $commande['date_commande'] . " - Status: " . ($commande['status'] ? 'Livrée' : 'En cours') . "<br>";
    }
}

// Exécuter les fonctions de test
if (php_sapi_name() == 'cli') {
    testInsererCommande();
    testGetCommandeById();
    testGetAllCommandes();
}
