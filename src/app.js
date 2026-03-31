const path = require("node:path");

const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const publicDirectory = path.join(__dirname, "..", "public");
const themesDirectory = path.join(publicDirectory, "Themes");
const adminDirectory = path.join(publicDirectory, "admin");
const legacyAdminPath = "/challenges/exemple/defiexemple/defiexemple.html";

const challengeRoutes = {
    "/jeu1.html": "/challenges/logique/shapes-challenge/shapes.html",
    "/jeu2.html": "/challenges/logique/logic-challenge/logic.html",
    "/jeu3.html": "/challenges/logique/charade-challenge/charade.html",
    "/jeu_memoire1.html": "/challenges/memory/number/number.html",
    "/jeu_memoire2.html": "/challenges/memory/image-memory/retenirimage.html",
    "/jeu_memoire3.html": "/challenges/memory/image-info/imageinfo.html",
    "/jeu_decryptage1.html": "/challenges/Decryptage/cesar/cesar.html",
    "/jeu_decryptage2.html": "/challenges/Decryptage/morse/morse.html",
    "/jeu_decryptage3.html": "/challenges/Decryptage/chimie/chimie.html",
};

const themePageRedirects = {
    "/themes/logique": "/logic.html",
    "/themes/memoire": "/memoire.html",
    "/themes/decryptage": "/decryptage.html",
};

app.use(cors());
app.use(express.json());
app.use("/public", express.static(publicDirectory));
app.use("/challenges", express.static(themesDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectory, "index.html"));
});

for (const [routePath, targetPath] of Object.entries(themePageRedirects)) {
    app.get([routePath, `${routePath}/`], (req, res) => {
        res.redirect(targetPath);
    });
}

for (const [routePath, targetPath] of Object.entries(challengeRoutes)) {
    app.get([routePath, `/themes${routePath}`], (req, res) => {
        res.redirect(targetPath);
    });
}

app.get(legacyAdminPath, (req, res) => {
    res.redirect("/admin");
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(adminDirectory, "admin.html"));
});

app.get("/demo", (req, res) => {
    res.redirect("/admin");
});

app.use(express.static(publicDirectory));

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
