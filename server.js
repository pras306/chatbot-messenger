const express = require("express");
const cors = require("cors");
const path = require("path");

const api = require("./api");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build/index.html"));
// });


app.use("/api", api);

app.listen(port, () => console.log(`Listening on port ${port}`));