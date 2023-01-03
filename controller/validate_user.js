const { GET, PUT, FETCH, DEL, ALL, UPDATE } = require('../util/base');
const base_name = 'project_mesa_users';

const validate_user = async (email, password) => {

    console.log('validating user with \n email:', 
    email, '\n password:', password)
    
    try {
        let user =  await GET(base_name, email)

        if (user === null){
            console.log( 'no user in db w mail: ' + email)
            return {
                code: 403,
                msg: 'no user with mail: ' + email
            }
        }

        if (user.password === password) {
            console.log('welcome: ' + email)
            return {
                code: 200,
                msg: 'welcome: ' + email
            } 
        } else {
            console.log('code mismatch, wrong user')
            return {
                code: 403,
                msg: "unautherized user"
            }
        };

    } catch (e) {
        console.log(e, 'cant reach db')
        return {
            code: 503,
            msg: 'cant reach db'
        }
    }

};

module.exports = validate_user