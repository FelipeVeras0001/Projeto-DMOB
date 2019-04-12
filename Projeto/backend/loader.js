const server = require('./config/server')//chamar as funções criadas dentro do config
require('./config/database')
require('./config/routes')(server)
