<?php

namespace MovieAPP;

use MovieAPP\ConexionDB;
use \Exception;
require '../autoload.php';

class CommentDB
{   
    /**
     * Insertar comentario
     */
    public static function newComment($nombre, $nota, $texto)
    {  
        try {
            $conexion = ConexionDB::conectar("apimovie");

            //Primero sacamos el máximo id
            $comment = $conexion->comentarios->findOne(
                [],
                [
                    'sort' => ['id' => -1],
                ]
            );
            if (isset($comment['id']))
                $max = $comment['id'] + 1;
            else
                $max = 1;

            $result = $conexion->comentarios->insertOne([
                'id' => $max,
                'nombre' => $nombre,
                'nota' => $nota,
                'texto' => $texto,
            ]);

            //El mensaje de éxito
            //error_reporting(0);
            $result->status_message = "Created 1 document \n";
            $result->success = true;
            $result->status_code = 1;
            $result = json_encode($result);
        } catch (Exception $e) {
            $result = 'Error: ' . $e->getMessage();
        }
        $conexion = null;
        return $result;
    }

    /**
     * Devuelve todos los comentarios
     */
    public static function getComments()
    {
        try {
            $conexion = ConexionDB::conectar("apimovie");
            $cursor = $conexion->comentarios->find();

            foreach ($cursor as $id => $comentario) {
                $comments[] = new Comment(
                    $comentario["id"],
                    $comentario["nombre"],
                    $comentario["nota"],
                    $comentario["texto"]
                );
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
        $conexion = null;
        return $comments;
    }

    /**
     * Borrar comentario por id
     */
    public static function deleteComment($id)
    {
        try {
            $conexion = ConexionDB::conectar("apimovie");
            $result = $conexion->comentarios->deleteOne(array('id' => intval($id)));

            //El mensaje de éxito
            error_reporting(0);
            $result->status_message = "Deleted " . $result->getDeletedCount() . " document(s)\n";
            $result->success = true;
            $result->status_code = 1;
            $result = json_encode($result);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
        $conexion = null;
        return $result;
    }
}

//echo CommentDB::getComments()[0]->getTexto();
//echo CommentDB::newComment("Abdel", 8.5, "I like it");
echo CommentDB::deleteComment(3);
