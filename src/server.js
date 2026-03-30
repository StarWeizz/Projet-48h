const fs = require("node:fs");
const path = require("node:path");

const dotenv = require("dotenv");

const rootEnvPath = path.resolve(process.cwd(), ".env");
const legacyEnvPath = path.resolve(__dirname, ".env");
const envPath = fs.existsSync(rootEnvPath) ? rootEnvPath : legacyEnvPath;

dotenv.config({ path: envPath });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`API ready on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server:", error.message);
        process.exit(1);
    }
}

startServer();
