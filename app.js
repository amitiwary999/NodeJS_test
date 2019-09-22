const express = require('express')
    // const Joi = require('joi') // used for validation
const app = express()
app.use(express.json())

const books = [
    { title: 'Harry Potter', id: 1 },
    { title: 'Twilight', id: 2 },
    { title: 'Lorien Legacies', id: 3 }
]

// READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!')
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id))

    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>')
    res.send(book)
})

// CREATE Request Handler
app.post('/api/books', (req, res) => {

    const { error } = false;
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const book = {
        id: books.length + 1,
        title: req.body.title
    }
    books.push(book)
    res.send(book)
})

// UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>')

    const { error } = false;
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    book.title = req.body.title
    res.send(book)
})

// DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {

    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>')

    const index = books.indexOf(book)
    books.splice(index, 1)

    res.send(book)
})

// function validateBook(book) {
//     const schema = {
//         title: Joi.string().min(3).required()
//     }
//     return Joi.validate(book, schema)
// }

// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}..`))