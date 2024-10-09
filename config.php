<?php
class Database{
    private static $instance = null;
    private $connection;
    private $host = 'localhost';
    private $db_name = 'zeduc';
    private $user_name = 'postgres';
    private $password = 'admin';

    private function __construct(){
        try {
            $dsn = "pgsql:host=$this->host;dbname=$this->db_name";
            $this->connection = new PDO($dsn, $this->user_name, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection(){
        return $this->connection;
    }

    private function __clone(){}

}