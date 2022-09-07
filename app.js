import express from "express";
const app = express();

import { router } from "./router/index.js"

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", router);

const port = process.env.PORT || 8080

const server = app.listen(port, () => {
  console.log(`Server up on port ${server.address().port}`);
})

server.on("Error", (error) => `${error}`);