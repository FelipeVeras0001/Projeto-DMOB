const _ = require('lodash')
const BillingCycle = require('./billingCycle')

//métodos operações de inclusão, alteração e exclusão utilizado no node-restful
BillingCycle.methods(['get', 'post', 'put', 'delete'])

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if (bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

//fazer com que o put retorne um registro atualizado e fazer validações
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.route('count', function(req, res, next) {
  BillingCycle.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})
module.exports = BillingCycle
