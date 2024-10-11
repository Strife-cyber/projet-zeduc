<?php
class Parameters {
    private $parrain;
    private $commande;

    public function __construct($parrain, $commande) {
        $this->parrain = $parrain;
        $this->commande = $commande;
    }

    public function getParrain() {
        return $this->parrain;
    }

    public function getCommande() {
        return $this->commande;
    }
}

function getParametre(){
    $jsonFilePath = './parameters/data.json';

    if (file_exists($jsonFilePath)) {
        $json = file_get_contents($jsonFilePath);

        $json = json_decode($json, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            return new Parameters($json['parrain'], $json['commande']);
        } else {
            echo "Error backend error";
        }
    }

    return null;
}