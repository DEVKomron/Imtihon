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
        await sequelize.authenticate();    
        await sequelize.sync({ alter: true });
        
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

start()