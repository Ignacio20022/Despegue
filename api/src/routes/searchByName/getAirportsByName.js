const { Router } = require("express");

const axios = require('axios')
require("dotenv").config();

const router = Router();


//modificar esto
const apikey = process.env.API_KEY || "637d817be277bdbf7ea82848"

router.get('/from', async (req,res) => {
    const {nombre} = req.query
    try {
        let response = await axios.get(`https://api.flightapi.io/iata/${apikey}?name=${nombre}&type=airport`)
        let result = response.data.data.filter(e => e.iata.length)
        return res.json(result) 
    } catch (error) {
       console.log(error.response.data.message)
       res.status(404).send({
        error: error.response.data.message ? error.response.data.message : error,
      });
    }

})

router.get('/to', async (req,res) => {
    const {nombre} = req.query
    try {
        let response = await axios.get(`https://api.flightapi.io/iata/${apikey}?name=${nombre}&type=airport`)
        let result = response.data.data.filter(e => e.iata.length)
        return res.json(result) 
    } catch (error) {
        console.log(error.response.data.message)
        res.status(404).send({
            error: error.response.data.message ? error.response.data.message : error,
          });
    }

})

module.exports = router
