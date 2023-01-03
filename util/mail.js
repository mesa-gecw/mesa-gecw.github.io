const mail_id = process.env.MAIL_ID;
const pass = process.env.MAIL_PASS;

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: mail_id, pass: pass } });

const target_url = "http://localhost:5500/public/auth/new_password.html"
module.exports = (destination, code) => {
    let mailOptions = {
        from: mail_id,
        to: destination,
        subject: 'Mesa gecw authentication',
        html: `<h1>Hi<h1>
		<h2>you found this message as someone tried 
		to verify your email at mesa gecw. If it was really you 
		<a style="padding: 10px; background: yellow; font-size: large;"
		href="${target_url}?&email=${destination}&verification_code=${code}">
		click here</a> to verify your authenticity at mesa gecw.
		else, just ignore/delete this message.</h2>
		<em>thank you<em>`
	};
	
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
				reject('Failed to send mail 😐');
			} else {
				resolve('Mail with a verification code has been send😃');
			};
		});
	});
};