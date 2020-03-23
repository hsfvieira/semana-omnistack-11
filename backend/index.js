import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.json({
        nome: 'Teste',
        numero: 2111
    })
})

app.listen(3333)