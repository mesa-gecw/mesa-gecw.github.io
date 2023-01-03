const express = require('express');
const mail = require('../util/mail');

const router = express.Router();

const { GET, PUT, FETCH, DEL, ALL, UPDATE } = require('../util/base');
const base_name = 'project_mesa_users';


router.post('/', (req, res) => {

    let email = req.body.email;
    console.log('req to reset password of mail: ' + email)

    verification_code = (Math.floor((Math.random() * 10000) + 999)).toString();

    // send mail
    mail(email, verification_code)
        .then(r => { 
            console.log(r);

            // record in database
            UPDATE(base_name, { 
                verification_code: verification_code,
                last_seen: Date.now()
            }, email).then(j => {
                console.log(j);
                res.json({ 
                    code: 200,
                    msg: `✅ A link to authenticate has been sent to ${email}`
                });
            }).catch(e => { 
                console.log(e);
                res.json({ 
                    code: 500,
                    msg: "🥴 Can't write to database. But, mail is sent to " + email
                });
            });

        }).catch(e => { 
            console.log(e);
            res.json({ 
                code: 500,
                msg: "❌ Can't send mail to " + email
            });
        });

});

module.exports = router;