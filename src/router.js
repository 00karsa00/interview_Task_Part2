const express = require('express')
const router = express.Router()
const service = require('./service')
const useService = new service()

router.post('/form/save-details', (req, res) => {
    useService.saveDetails(req.body, (result) => {
        res.send(result)
    })
})

router.post('/login', (req, res) => {
    useService.userLogin(req.body, (result) => {
        res.send(result)
    })
})

router.get('/form/delete-details/:id', (req, res) => {
    useService.deleteUser(req.params, (result) => {
        res.send(result)
    })
})

router.get('/user-details/:token', (req, res) => {
    useService.getUserDeails(req.params, (result) => {
        res.send(result)
    })
})

router.get('/allUserDetails',(req,res) => {
    useService.allUserDetails(req.params, (result) => {
        res.send(result)
    })
})

router.get('/getCountryList',(req,res) => {
    useService.getCountryList(req.params, (result) => {
        res.send(result)
    })
})

router.get('/getStateList/:country',(req,res) => {
    useService.getStateList(req.params, (result) => {
        res.send(result)
    })
})

//add county list in database
router.get('/loadJsonData',(req,res) => {
    useService.loadJson(req.params, (result) => {
        res.send(result)
    })
})

router.get('/countryCode',(req, res) => {
    useService.loadCountryCode(req.params, (result) => {
        res.send(result)
    })
})


module.exports  = router