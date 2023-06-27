import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await  livros.find().populate("autor");

      res.status(200).json(livrosResultado);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livro = await livros.findById(id).populate("autor");

      if (livro == null)
        return next(new NaoEncontrado("Livro não encontrado"));

      res.status(200).send(livro);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body, next);

      await livro.save();

      res.status(201).send(livro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livro = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livro == null) 
        return next(new NaoEncontrado("Livro não encontrado"));

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const livro = await livros.findById(id);

      if (livro == null) 
        return next(new NaoEncontrado("Livro não encontrado"));

      await livros.deleteOne(livro);
      
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await this.busca(req);

      if (busca == null)
        return res.status(200).send([]);

      const livrosResultado = await livros
        .find(busca)
        .populate("autor");
      res.status(200).send(livrosResultado);
    } catch (error) {
      next(error);
    }
  };

  static busca = async (req) => {
    const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = req.query;
    const busca = {};

    if (editora) busca.editora = { $regex: editora, $options: "i"};
    if (titulo) busca.titulo = { $regex: titulo, $options: "i"};
    if (minPaginas) busca.numeroPaginas = {$gte: minPaginas};
    if (maxPaginas) busca.numeroPaginas = {...busca.numeroPaginas, $lte: maxPaginas};
    if (nomeAutor) {
      const autor = await autores.findOne({nome: { $regex: nomeAutor, $options: "i"}});
      if (autor == null) 
        return null;

      busca.autor = autor._id;
    }
    return busca;
  };
}

export default LivroController;