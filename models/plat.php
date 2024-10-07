<?php
class ModelPlat{
    private $connection;

    public function __construct(){
        $this->connection = Database::getInstance()->getConnection();
    }

    private function insererPlat($id, $path, $nom, $prix){
        $sql = "INSERT INTO plat(id_plat, image, nom, prix) VALUES (:id, :image, :nom, :prix)";

        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':image', $path);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prix', $prix);

        return $stmt->execute();
    }

    private function saveImage($image, $path, $nom){
        if(is_dir($path)){
            mkdir($path, 0777, true);
        }

        $targetFile = $path . '/' . $nom;

        if(move_uploaded_file($image['tmp_name'], $targetFile)){
            return true;
        } else {
            return false;
        }
    }
    
    public function createPlat($id, $image, $nom, $prix){
        $path = 'uploads/images/';
        $this->insererPlat($id, $path, $nom, $prix);
        $this->saveImage($image, $path, $nom);
    }
}