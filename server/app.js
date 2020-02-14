require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(cors())

let USER_DB = process.env.USER_MONGO_DB;
let PASS_DB = process.env.PASS_MONGO_DB;

mongoose.connect(
  "mongodb+srv://" +
    `${USER_DB}` +
    ":" +
    `${PASS_DB}` +
    "@cluster0-h8s0x.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("to aqui");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requestes on port 4000");
});
