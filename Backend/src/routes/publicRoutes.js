const express = require("express");
const publicController = require("../controllers/publicController");
const interactionController = require("../controllers/interactionController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.get("/bootstrap", publicController.bootstrap);
router.get("/ui-texts", publicController.uiTexts);
router.get("/hero", publicController.hero);
router.get("/mayor", publicController.mayor);
router.get("/stats", publicController.stats);
router.get("/departments", publicController.departments);
router.get("/services", publicController.services);
router.get("/news", publicController.news);
router.get("/news/:slug", publicController.newsDetail);
router.post("/visit", publicController.recordVisit);

router.post("/contact", interactionController.submitContact);
router.post("/subscribe", interactionController.subscribe);

module.exports = router;
