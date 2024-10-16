<?php

include_once 'models/gerant.php';

class GerantController{
    private $gerant;

    public function __construct(){
        $this->gerant = new Gerant();
    }

    public function getEmployer(){
        return $this->gerant->getEmployer();
    }

    public function insertEmployer($id, $nom, $email, $password, $date){
        return $this->gerant->insertEmployer($id, $nom, $email, $password, $date);
    }

    public function deleteEmployer($id){
        return $this->gerant->deleteEmployer($id);
    }
}