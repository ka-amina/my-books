const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
app.use(bodyParser.json())
app.use (cors())

app.post ('/book', async(req,res) => {
    const {Title,Description, Author, Price, Category, Publication_date} = req.body
    const newbook = await prisma.books.create({
        data:{
            Title,Description,Author,Price,Category,Publication_date
        }
    })
    res.json(newbook)
})

app.get('/books', async(req, res) => {
    const books = await prisma.books.findMany()
    res.json(books)
})

app.get('/book/:id', async(req, res) => {
    const id = req.params.id
    const book = await prisma.books.findUnique({
        where:{
            id : parseInt(id)
        }
    })
    res.json(book)
})
app.patch('/books/Update/:id', async(req, res) => {
 const id = req.params.id
 const {Title,Description, Author, Price, Category, Publication_date} = req.body
 const updatedbook = await prisma.books.update({
     where:{
         id : parseInt(id)
     },
     data:{
         Title,Description,Author,Price,Category,Publication_date
    }
    })
    res.json(updatedbook)
})

app.delete('/books/Del/:id', async(req, res) => {
    const id = req.params.id
    const deletebook = await prisma.books.delete({
        where:{
            id : parseInt(id)
        }
       })
       res.json(deletebook)
   })
app.use((err, req, res, next) => {
    console.error(err.stack)
   res.status(500).send('Something broke!')
  })
  
app.listen(1010, () => {
    console.log('connected')
})


