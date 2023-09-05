"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const db_js_1 = require("./database/db.js");
const blogPost_1 = __importDefault(require("./routes/blogPost"));
const author_js_1 = __importDefault(require("./routes/author.js"));
const logger_js_1 = __importDefault(require("./logger/logger.js"));
const errorHandler_js_1 = __importDefault(require("./middleware/errorHandler.js"));
// initialize mongoose connection
(0, db_js_1.dbConnect)();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// configuring helmet to strengthen CSP
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
    }
}));
app.use(express_1.default.json());
app.use('/api', blogPost_1.default);
app.use('/author', author_js_1.default);
// Handle invalid routes
app.use((req, res) => {
    logger_js_1.default.info(`Invalid route: ${req.path}`);
    res.status(404).send('404 Not Found');
});
// Configure error handling middleware
app.use(errorHandler_js_1.default);
app.listen(port, () => {
    logger_js_1.default.info(`Server is running at http://localhost:${port}`);
});
exports.default = app;
