const router = require("express").Router();
let user = require('../models/user.model');



router.route('/save').post((req, res) => {
    const username = req.body.username;
  
    const newUser = new user({
      username
    });
  
    newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log(req.body)
  });


  module.exports = router;