
const express = require('express');

const router = express.Router();

const { GET, PUT, FETCH, DEL, ALL } = require('../util/base');

router.get('/', (req, res) => {
    let last = req.query.last ? req.query.last : '';
    let limit = req.query.limit ? parseInt(req.query.limit) : 25;
    let qory = ((req.query.mail) && (req.query.mail !== '')) ? { mail: req.query.mail } : {};
    FETCH('sw_ads', last, limit, qory)
        .then(j => {
            res.json({
                code: 333,
                msg: j
            });
        }).catch(e => {
            console.log(e)
            res.json({
                code: 999,
                msg: "🥴 Can't reach database."
            });
        });
});

module.exports = router;