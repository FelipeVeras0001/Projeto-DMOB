const mongoose = require('mongoose')//conexão com o banco de dados
module.exports = mongoose.connect('mongodb://localhost/db_finance', { useNewUrlParser: true })

//mensagens de erros atribuidos no banco
mongoose.Error.messages.general.required= "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min="O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max="O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum="O '{VALUE}' não é válido para o atributo '{PATH}'."
