const restful = require('node-restful')
const mongoose = restful.mongoose

//schema créditos que irá para o banco
const creditSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  value: {type: Number, min: 0, required: true}
})

//schema débitos que irá aparecer no banco
const debtSchema = new mongoose.Schema ({
  name: { type: String, required: true},
  value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] },
  status: { type: String, required: false, uppercase: true,
  enum: ['PAGO','PENDENTE','AGENDADO'] }
})

//schema da aplicação
const billingCycleSchema = new mongoose.Schema ({
  name: { type: String, required: true},
  month: {type: Number, min: 1, max: 12, required: true},
  year: { type: Number, min: 1970, max: 2100, required: true},
  credits: [creditSchema],
  debts: [debtSchema]
})

module.exports = restful.model('billingCycle', billingCycleSchema)
