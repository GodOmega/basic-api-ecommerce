const app = require('./app')
const {port} = require('./config')

app.listen(port, () => {
    console.log(`APP RUNNING IN PORT: ${port}`)
    console.log(`API docs available in: http://localhost:${port}/docs`)
})