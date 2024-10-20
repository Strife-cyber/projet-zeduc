<?php

include_once 'parameters/parameters.php';
include_once 'config.php';

class PoliticController{
    private $conn;

    public function __construct(){
        $this->conn = Database::getInstance()->getConnection();
    }

    public function getPolitic(): array {
        $parameter = getParametre();
        return [ 'commande' => $parameter->getCommande(), 'parrain' => $parameter->getParrain(), 'convert' => $parameter->getConvert() ];
    }

    public function updateUserPoints($id_client, $points): string {
        $sql = "UPDATE client SET points = :points WHERE id_client = :id_client";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':points', $points);
        $stmt->bindParam(":id_client", $id_client);

        $stmt->execute();
        return 'Mise A jour effectuer';
    }
}
