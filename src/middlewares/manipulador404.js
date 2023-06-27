import Erro404 from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
  const erro404 = new Erro404();
  next(erro404);
}

export default manipulador404;