<?php
namespace MovieAPP;

use Exception;
use MongoDB\Client;

require '../vendor/autoload.php';

class ConexionDB {

    private static $conexion;

    public static function conectar($database,$host="mongodb://localhost:27017") {
        try {
            self::$conexion = (new Client($host))->{$database};
        } catch (Exception $e){
            echo $e->getMessage();
        }

        return self::$conexion;
    }

    public static function desconectar() {
        self::$conexion = null;
    }
} 
?>