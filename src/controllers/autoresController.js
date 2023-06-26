import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const autor = await autores.findById(id);

      if (autor == null) 
        return res.status(404).send({message: "Autor não encontrado"});

      res.status(200).send(autor);

    } catch (error) {
      if (error instanceof mongoose.Error.CastError) 
        return res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});

      res.status(500).send({message: "Erro interno do servidor"});
    }
  };

  static cadastrarAutor = (req, res) => {
    try {
      let autor = new autores(req.body);
      
      autor.save();

      res.status(201).send(autor.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar Autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

}

export default AutorController;