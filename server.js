const express = require("express");
const app = express();
const cors = require("cors");
const router = require(".server/router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/dbconnect");

const errorMiddleware = require("../server/middlewares/error-middleware");

require("dotenv").config();

// Middleware
var corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use the router for handling routes under "/api/auth"
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Lets Define Admin Route
app.use("/api/admin", adminRoute);

// Error Middleware
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
});
