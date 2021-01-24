<?php

use MovieAPP\CommentDB;

//include_once("../autoload.php"); 

    //Acción de cargar los libros en la página principal
    if (isset($_POST['action'])) {
        
       //Insertar comentario
       if ($_POST['action'] == "insertComment") {
            CommentDB::newComment($_POST);
        }
    }
