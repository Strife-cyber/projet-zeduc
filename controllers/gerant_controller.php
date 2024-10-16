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
}