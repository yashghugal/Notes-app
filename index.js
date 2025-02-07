const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files })
    })
})

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedetails) => {
        res.render('read', ({ filename: req.params.filename, filedetails: filedetails }))
    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, () => {
        console.log('file created')
    })
    res.redirect('/')
})

app.get('/edit/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedetails) => {
        res.render('edit', ({ filename: req.params.filename, filedetails: filedetails }))
    })
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.titleold}`,`./files/${req.body.titlenew}`,(err)=>{
    
    })
    fs.writeFile(`./files/${req.body.titlenew}`,req.body.details,(err)=>{
    
    })
    res.redirect("/")
})

app.get('/delete/:filename',(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
    res.redirect("/")
})
})
app.get('/back',(req,res)=>{
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("server started")
})