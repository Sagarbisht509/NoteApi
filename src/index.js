const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
    res.send("Notes API");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log("started at port " + PORT);
    });
})
.catch((error) => {
    console.log("error");
})

//app.use("/.netlify/function/api", router);

//module.exports = app;
//module.exports.handler = serverless(app);