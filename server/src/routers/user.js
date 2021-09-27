const { Router } = require('express');
const user = require('../models/user');
const cors = require('cors');
const router = Router();

router.use(cors({origin: 'http://192.168.43.252:8080'}));

router.route('/')
    .get(async (req, res)=>{
        const newUser = new user({name : 'carlos'});
        await newUser.save();
        res.send('hole');
    })
    .post(async (req, res)=>{
        let {name, email, phone, country, city, password} = req.body;
        console.log({name, email, phone, country, city, password});
        
        const newUser = new user({name, email, phone, country, city, password});
        await newUser.save();
        res.sendStatus(200).end();
    })

module.exports = router;