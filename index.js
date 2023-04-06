const fastify = require('fastify')({
    logger: true,
    ignoreTrailingSlash:true
})
const db = require('./queries')


fastify.get('/',(req,res) => {
    res.send('hello world...') 
})

fastify.post('/users',db.logIn)

fastify.listen(3000) 