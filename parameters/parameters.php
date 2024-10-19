<?php
class Parameters {
    private $parrain;
    private $commande;
    private $convert;

    public function __construct($parrain, $commande, $convert) {
        $this->parrain = $parrain;
        $this->commande = $commande;
        $this->convert = $convert;
    }

    public function getParrain() {
        return $this->parrain;
    }

    public function getCommande() {
        return $this->commande;
    }

    public function getConvert() {
        return $this->convert;
    }
}

function getParametre(){
    $jsonFilePath = './parameters/data.json';

    if (file_exists($jsonFilePath)) {
        $json = file_get_contents($jsonFilePath);

        $json = json_decode($json, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            return new Parameters($json['parrain'], $json['commande'], $json['convert']);
        } else {
            echo "Error backend error";
        }
    }

    return null;
}
