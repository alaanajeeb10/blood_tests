// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0
const port = 6969;
const express = require('express');
const app = express();
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
var options = {
    explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

let db_M = require('./database');
global.db_pool = db_M.pool;

global.htmlspecialchars = require('htmlspecialchars');
// const { addSlashes, stripSlashes } = require('slashes');

const Hosts_R = require('./Routers/Hosts_R');
app.use('/H/',Hosts_R);

const Tests_R = require('./Routers/Tests_R');
app.use('/T/',Tests_R);

const Pages_R = require('./Routers/Pages_R');
app.use('/',Pages_R);

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, "/views"));

app.use("/js",express.static(path.join(__dirname, "js")));

app.use("/css",express.static(path.join(__dirname, "css")));


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});