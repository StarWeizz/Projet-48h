module.exports = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || "resource";
        return res.status(409).json({ message: `${field} already exists.` });
    }

    console.error(error);

    return res.status(error.status || 500).json({
        message: error.message || "Internal server error.",
    });
};
