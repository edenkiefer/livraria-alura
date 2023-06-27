import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findById(id);

      if (autor == null) 
        return next(new NaoEncontrado("Autor não encontrado"));

      res.status(200).send(autor);

    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      
      console.log(autor.editora);

      const autorResultado = await autor.save();

      console.log(autor.editora);

      res.status(201).send(autorResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autor == null) 
        return next(new NaoEncontrado("Autor não encontrado"));

      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findById(id);

      if (autor == null) 
        return next(new NaoEncontrado("Autor não encontrado"));

      await autores.deleteOne(autor);
      
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;