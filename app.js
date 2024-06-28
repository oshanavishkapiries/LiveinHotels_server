require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const CustomError = require("./utils/CustomError");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(helmet());
app.use("/", require("./routes/all.routes"));

app.get("*", (next) => {
  throw new CustomError("route not found!", 400);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
