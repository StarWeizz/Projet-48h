const path = require("node:path");

const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use("/challenges", express.static(path.join(__dirname, "..", "public", "Thèmes")));

app.get("/", (req, res) => {
    res.json({
        name: "Challenge 48H API",
        status: "running",
        docs: "/api",
        demo: "/demo",
    });
});

app.get("/demo", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "public", "Thèmes", "exemple", "defiexemple", "defiexemple.html")
    );
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
