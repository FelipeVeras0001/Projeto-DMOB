const express = require('express')

module.exports = function(server) {

  //receber server como parâmetro que foi declarado em server.js para passar para outro módulo (routes.js)
  module.exports = function(server){
    // API Routes
    const router = express.Router()
    server.use('/api', router) // minddleware

  // rotas do API
  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)
}
