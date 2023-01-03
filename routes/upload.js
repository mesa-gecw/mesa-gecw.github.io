const express = require('express');

const router = express.Router();

const DRIVE = require('../util/drive');
const { GET, PUT, FETCH, DEL, ALL, UPDATE } = require('../util/base');

router.post("/", async (req, res) => {

    let ad_id = req.body.ad_id,
        v_code = req.body.v_code,
        in_mail = req.body.mail,
        title = req.body.title,
        link_url = req.body.link_url,
        link_text = req.body.link_text,
        description = req.body.description,
        old_path = req.body.old_path,
        adimage = req.files ? req.files.adimage : undefined;

    if (ad_id === 'new') ad_id = ('AD' + Math.floor((Math.random() * 100000000000) + 99999999999));
    
    GET('sw_users', in_mail)
        .then(async r => {
            if (r === null){
                res.json({ 
                    code: 444,
                    msg: `🔐 Can't find an authorized mail ID to attach this ad. Please do (re)authenticate.`
                });
            } else {
                if (r.v_code === v_code){
                    let uploaded_path;
                    try {
                        if (adimage){
                            if (old_path.length > 0) await DRIVE.DELETE(old_path);
                            uploaded_path = await DRIVE.PUT(ad_id + adimage.name, adimage.data, adimage.mimetype);
                            console.log('RETURNED PATH:', decodeURIComponent(uploaded_path));
                        } else {
                            uploaded_path = old_path;
                        };
                    } catch (e) {
                        console.log(e);
                        res.json({ 
                            code: 666,
                            msg: "❌ Can't reach the media drive."
                        });
                    };
                    PUT('sw_ads', {
                            key: ad_id,
                            mail: in_mail,
                            title: title,
                            link_url: link_url,
                            link_text: link_text,
                            description: description,
                            path: uploaded_path,
                            last_seen: Date.now()
                        }).then(r => {
                            console.log('🤓 Ad published with id: ' + ad_id);
                            res.json({ 
                                code: 222,
                                msg: '🤓 Ad published with id: ' + ad_id
                            });
                        }).catch(e => {
                            console.log(e)
                            res.json({ 
                                code: 999,
                                msg: `🥴 Can't reach database to publish ad.`
                            });
                        });
                } else {
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