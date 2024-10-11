<?php

include_once 'models/client.php';

class ClientController{
    private $client;

    public function __construct(){
        $this->client = new ModelClient();
    }

    public function login($email, $password){
        return $this->client->connexion($email, $password);
    }

    public function signup($id, $name, $email, $password){
        return $this->client->createClient($id, $name, $email, $password);
    }

    public function getMenu($date){
        return $this->client->viewMenu($date);
    }

    public function getCommandes($id, $date){
        return $this->client->getCommads($id, $date);
    }
}