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

    public function updateCommands($id){
        return $this->employee->updateCommade($id);
    }
}
