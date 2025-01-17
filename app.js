const express = require("express");
const sequelize = require("./config/db")
const config = require("config");
const MainRouter = require("./router/index.routes");

const app = express()
const port = config.get("port")


app.use(express.json())
app.use("/api",MainRouter)


async function start() {
    try {
        console.log("Connecting to the database...");
        await sequelize.authenticate();    
        console.log("Database connected successfully!");
        await sequelize.sync({ alter: true });
        
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

start()