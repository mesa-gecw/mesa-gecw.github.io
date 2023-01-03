const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.json());
app.set('json spaces', 4);
app.use(express.static('public'));
const cors = require('cors');
app.use(cors({ 
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const upload = require("express-fileupload");
app.use(upload());

const dotenv = require('dotenv')
dotenv.config('.env')

api_folder = "routes"
let api_routes = fs.readdirSync(__dirname + '/' + api_folder);
api_routes.forEach(route => {
    let route_name = route.slice(0, -3);
    app.use(`/${route_name}`, require(`./${api_folder}/${route_name}`));
});

process.env.DETA_RUNTIME ? module.exports = app : app.listen(3000, console.log('>>> http://localhost:3000'));