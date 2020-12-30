//console.log('Hello World')

const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


/*
  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })
*/

const server = http.createServer(app)


server.listen(config.PORT, () => {
    logger.info(`Server is runnin on ${config.PORT}`)
})




