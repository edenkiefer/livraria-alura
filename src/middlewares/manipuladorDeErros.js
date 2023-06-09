import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next)  {
  if (error instanceof mongoose.Error.CastError) 
    return new RequisicaoIncorreta().enviarResposta(res);

  if (error instanceof mongoose.Error.ValidationError)
    return new ErroValidacao(error).enviarResposta(res);

  if (error instanceof ErroBase) {
    return error.enviarResposta(res);
  }

  new ErroBase().enviarResposta(res);
}

export default manipuladorDeErros;