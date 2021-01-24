<?php

namespace MovieAPP;

class Comment
{

    private $id;
    private $nombre;
    private $nota;
    private $texto;

    //Constructor
    public function __construct($id = 0, $nombre = "", $nota = 0, $texto = "")
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->nota = $nota;
        $this->texto = $texto;
    }



    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of nombre
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return  self
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }



    /**
     * Get the value of nota
     */
    public function getNota()
    {
        return $this->nota;
    }

    /**
     * Set the value of nota
     *
     * @return  self
     */
    public function setNota($nota)
    {
        $this->nota = $nota;

        return $this;
    }

    /**
     * Get the value of texto
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set the value of texto
     *
     * @return  self
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }
}
