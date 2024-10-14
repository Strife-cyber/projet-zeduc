<?php

include_once 'models/employer.php';

class EmployeeController{
    private $employee;

    public function __construct(){
        $this->employee = new ModelEmployer();
    }

    public function getCommands($date){
        return $this->employee->getCommande($date);
    }

    public function updateCommands($id, $livreur){
        return $this->employee->updateCommande($id, $livreur);
    }

    public function getPlat(){
        return $this->employee->getPlat();
    }

    public function insererPlat($id, $image, $nom, $prix){
        return $this->employee->insererPlat($id, $image, $nom, $prix);
    }

    public function insererMenu($id, $date){
        return $this->employee->insererMenu($id, $date);
    }

    public function deleteMenu($id, $date){
        return $this->employee->delMenu($id, $date);
    }

    public function getMenu($date){
        return $this->employee->getMenu($date);
    }

    public function statisticPlat(){
        return $this->employee->statisticPlat();
    }

    public function tempMoyen(){
        return $this->employee->tempMoyen();
    }

    public function detailsTemp(){
        return $this->employee->detailsTemp();
    }

    public function commandeLivrer(){
        return $this->employee->commandeLivrer();
    }

    public function getReclamation(){
        return $this->employee->get_reclamation();
    }
}
