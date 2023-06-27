import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(message="Página não encontrada.") {
    super(message, 404);
  }
}

export default NaoEncontrado;