const path = require("node:path");

const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const publicDirectory = path.join(__dirname, "..", "public");
const themesDirectory = path.join(publicDirectory, "Thèmes");
const adminPath = "/challenges/exemple/defiexemple/defiexemple.html";

const challengeRoutes = {
    "/jeu1.html": "/challenges/logique/shapes-challenge/shapes.html",
    "/jeu2.html": "/challenges/logique/logic-challenge/logic.html",
    "/jeu3.html": "/challenges/logique/charade-challenge/charade.html",
    "/jeu_memoire1.html": "/challenges/Memoire/number.html",
    "/jeu_memoire2.html": "/challenges/memory/image-memory/retenirimage.html",
    "/jeu_memoire3.html": "/challenges/memory/image-info/imageinfo.html",
    "/jeu_decryptage1.html": "/challenges/Decryptage/cesar/cesar.html",
    "/jeu_decryptage2.html": "/challenges/Decryptage/morse/morse.html",
    "/jeu_decryptage3.html": "/challenges/Decryptage/chimie/chimie.html",
};

app.use(cors());
app.use(express.json());
app.use("/public", express.static(publicDirectory));
app.use("/challenges", express.static(themesDirectory));
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/themes/logique", (req, res) => {
    res.sendFile(path.join(publicDirectory, "logic.html"));
});

app.get("/themes/memoire", (req, res) => {
    res.sendFile(path.join(publicDirectory, "memoire.html"));
});

app.get("/themes/decryptage", (req, res) => {
    res.sendFile(path.join(publicDirectory, "decryptage.html"));
});

for (const [routePath, targetPath] of Object.entries(challengeRoutes)) {
    app.get(routePath, (req, res) => {
        res.redirect(targetPath);
    });
}

app.get("/admin", (req, res) => {
    res.redirect(adminPath);
});

app.get("/demo", (req, res) => {
    res.redirect("/admin");
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
