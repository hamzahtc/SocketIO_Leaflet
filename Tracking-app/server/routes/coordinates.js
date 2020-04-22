const router = require("express").Router();
let carte = require('../models/coordinate.model');



router.route('/save').post((req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const pucename = req.body.pucename;
    const username = req.body.username;
    const newCarte = new carte({
        lat,
        lng,
        pucename,
        username
    });
  
    newCarte.save()
    .then(() => res.json(newCarte))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log(req.body)
  });


  module.exports = router;