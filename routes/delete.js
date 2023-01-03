
const express = require('express');

const router = express.Router();

const DRIVE = require('../util/drive');
const { GET, PUT, FETCH, DEL, ALL, UPDATE } = require('../util/base');

router.post('/', (req, res) => {
    let mail = req.body.mail,
        code = req.body.code,
        adimage = req.body.adimage,
        ad_id = req.body.ad_id;
    GET('sw_users', mail)
        .then(r => {
            if (r === null){
                res.json({ 
                    code: 444,
                    msg: `🔐 Can't find an authorized mail ID to attach this ad. Please do (re)authenticate.`
                });
            } else {
                if (r.v_code === code){
                    DRIVE.DELETE(adimage)
                        .then(r => {
                            console.log(r);
                            DEL('sw_ads', ad_id)
                                .then(z => {
                                    console.log(z);
                                    res.json({
                                        code: 222,
                                        msg: '🙂 Ad deleted with id: ' + ad_id
                                    });
                                }).catch(e => {
                                    console.log(e)
                                    res.json({ 
                                        code: 999,
                                        msg: `🥴 Can't reach database to delete advertisement.`
                                    });
                                });
                        }).catch(e => {
                            console.log(e)
                            res.json({ 
                                code: 999,
                                msg: `🥴 Can't reach drive to delete banner.`
                            });
                        });
                } else{
                    res.json({ 
                        code: 666,
                        msg: '❌ Wrong verification code. DO NOT SCRAP URL FROM MAILBOX.'
                    });
                };
            };
        }).catch(e => {
            console.log(e)
            res.json({ 
                code: 999,
                msg: `🥴 Can't reach database to read authorized mails.`
            });
        });
});



module.exports = router;