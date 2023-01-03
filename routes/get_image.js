const express = require('express');

const router = express.Router();

const DRIVE = require('../util/drive');

router.get('/:name', async (req, res) => {
    DRIVE.GET(req.params.name)
        .then(r => {
            res.setHeader('Content-Type', r.type);
            r.arrayBuffer().then(blob => {
                res.send(Buffer.from(blob));
            }).catch(e => {
                console.log(e);
                res.send(e);
            });
        }).catch(e => {
            console.log(e);
            res.send(e);
        });
});

module.exports = router;