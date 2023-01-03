const express = require('express');
const router = express.Router();
const validate_user = require('../controller/validate_user');

router.post('/', async (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    let result = await validate_user(email, password)

    console.log(result)

    res.json(result)
});

module.exports = router;