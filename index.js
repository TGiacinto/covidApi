const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const router = express();
const {config} = require("./config/covid-config")
const {workData,getDataProvince,getDataRegion} = require('./service/covid.service')

router.listen(3000, () => {
    config();
    workData().then(r => console.log("Success"));
    console.log("Server running on port 3000");
});

router.get("/provincia/:provincia",async (req, res, next) => {
    await res.json(await getDataProvince(req.params.provincia));
});

router.get("/regione/:regione",async (req, res, next) => {
    await res.json(await getDataRegion(req.params.regione));
});


