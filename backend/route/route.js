const express = require('express')
const router = express.Router()
const dataTemplate = require('../models/usermodel')

router.post('/profile', (req, res)=>{
    const user = new dataTemplate({
        name: req.body.name,
        email: req.body.email
    })
    user.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error =>{
        res.json(error)
    })
})

router.get('/profile', async (req, res)=>{
    dataTemplate.find(req.query)
    .then(data=>{
        res.json(data)
    })
    .catch(error=>{
        res.json(error)
    })
})

router.delete('/profile/:id', (req, res)=>{
    dataTemplate.findByIdAndDelete({_id: req.params.id})
    .then(doc => console.log(doc))
    .catch((err)=> console.log(err))
})

router.put('/profile/:id', (res, req) => {
    dataTemplate.findByIdAndUpdate({_id: res.params.id},
    {
        name: res.body.name,
        email: res.body.email,
    })
    .then(doc => console.log(doc))
    .catch(err => console.log(err))
})

module.exports = router