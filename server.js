const express = require("express");
const cors = require("cors");
const path = require("path");

const api = require("./api");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }

});

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/api", api);

// //Handle basic routing errors
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

//Handle errors thrown from anywhere else in the app
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));