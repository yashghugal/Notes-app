const express = require('express')
const path = require('path')
const app = express()
const fs= require('fs')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/Notes-app',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render('index',{files:files})
    })
})

app.get('/profile/:username',(req,res)=>{
    const user = req.params
    res.send(user)
    // res.render('index')
})
app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedetails)=>{
        res.render('create',({filename:req.params.filename,filedetails:filedetails}))
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,()=>{
        console.log('files created')
    })
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("server started")
})