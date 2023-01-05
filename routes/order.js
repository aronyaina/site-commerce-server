// COMMANDE ROUTES
const express = require("express");
const router = express.Router();
const { saveOrder } = require("../controllers/orderController");

// const requireAuth = require("../middleware/requireAuth");
// router.use(requireAuth);
router.post("/", saveOrder);

module.exports = router;
