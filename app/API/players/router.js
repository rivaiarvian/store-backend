var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");

const { isLoginPlayer } = require("../../middleware/auth");
const {
  landingPage,
  detailPage,
  categoryPage,
  checkoutPage,
  historyPage,
  historyDetailPage,
  dashboardPage,
  profilePage,
  editprofilePage,
} = require("./controller");

router.get("/landingPage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", categoryPage);
router.post("/checkout", isLoginPlayer, checkoutPage);
router.get("/history", isLoginPlayer, historyPage);
router.get("/history/:id/detail", isLoginPlayer, historyDetailPage);
router.get("/dashboard", isLoginPlayer, dashboardPage);
router.get("/profile", isLoginPlayer, profilePage);
router.put(
  "/profile",
  isLoginPlayer,
  multer({ dest: os.tmpdir() }).single("avatar"),
  editprofilePage
);

module.exports = router;
