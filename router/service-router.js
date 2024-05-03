const express = require("express");
const router = express.Router();
const servicepage = require("../controller/service-controller");

router.route("/service").get(servicepage);

module.exports = router;
