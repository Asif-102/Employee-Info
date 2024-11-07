const express = require("express");
const app = express();
const corsMiddleware = require("./src/middleware/cors");
// routers
const userRouter = require("./src/routers/userRouter");

const PORT = process.env.PORT || 8080;

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/users", userRouter);

// testing api

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});