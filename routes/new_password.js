const express = require('express');
const mail = require('../util/mail');

const router = express.Router();

const { GET, PUT, FETCH, DEL, ALL, UPDATE } = require('../util/base');
const base_name = 'project_mesa_users';


router.post('/', (req, res) => {

    let email = req.body.email,
        verification_code = req.body.verification_code,
        new_password = req.body.new_password;

    GET(base_name, email)
        .then(r => {
            
            console.log('res from deta for mail', email, ':', r)

            if (!(r.verification_code.length > 0)){

                console.log('v code not generated');
                res.json({ 
                    code: 500,
                    msg: "verification code already used"
                });

            } else {
                
                if (r.verification_code === verification_code){
                    
                    // put new password in database
                    PUT(base_name, { 
                        key: email,
                        verification_code: '',
                        password: new_password,
                        last_seen: Date.now()
                    }).then(j => {
                        console.log(j);
                        res.json({ 
                            code: 200,
                            msg: `✅ New password set up for email ${email}`
                        });
                    }).catch(e => { 
                        console.log(e);
                        res.json({ 
                            code: 500,
                            msg: "🥴 Can't write to database. "
                        });
                    });

                } else {

                    console.log('wrong v code');
                    res.json({ 
                        code: 500,
                        msg: "wrong verification code"
                    });
                }
            };

        }).catch(e => { 
            console.log(e);
            res.json({ 
                code: 500,
                msg: "🥴 Can't read database."
            });
        });

});

module.exports = router;