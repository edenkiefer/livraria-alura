import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await  livros.find().populate("autor");

      res.status(200).json(livrosResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const livro = await livros.findById(id).populate("autor");

      res.status(200).send(livro);
    } catch (error) {
      res.status(400).send({message: `${error.message} - Id do livro não localizado.`});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);

      await livro.save();

      res.status(201).send(livro.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar livro.`});
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});
      
      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      
      await livros.findByIdAndDelete(id);
      
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static listarLivroPorEditora = (req, res) => {
    try {
      const editora = req.query.editora;
      const livrosResultado = livros.find({"editora": editora}, {},);
      res.status(200).send(livrosResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
}

export default LivroController;