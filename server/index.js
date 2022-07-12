require("dotenv").config();
const express = require("express"),
cors = require("cors"),
    { connect } = require("mongoose"),
    app = express(),
    { PORT, DB_CONNECT } = process.env,
    Route = require("./Routes/navigator"),
    Transport = require("./Routes/csvToMongo");
app.use(express.json());
app.use("/api", cors({origin: ["http://localhost:3000","http://localhost:3001"] }), Route);
app.use("/addData", Transport);
connect(DB_CONNECT, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => {
    console.log("connected");
  })
  .catch(error => console.log(error.message));

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});

exports.app = app;
