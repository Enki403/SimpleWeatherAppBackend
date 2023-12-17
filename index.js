
require("dotenv").config(); //load .env
const PORT = process.env.PORT || 3000;

const express = require("express");

const app = express();

app.use("/api/weather", require("./routes/weather"));

app.listen( PORT, 
            ()=>console.log(`Server listening to port ${ PORT }`)
        );