const express = require("express");
const router = express.Router();

const controlController = require("../controllers/controlController");
const authMiddleware = require("../middleware/authMiddleware");
// 🔐 CHECK ACCESS
router.post("/check-access", controlController.checkAccess);

// 👥 ACTIVE USERS
router.get("/active-users", controlController.getActiveUsers);

// 🔴 FORCE LOGOUT
router.post("/force-logout", controlController.forceLogout);

// 📜 SESSION LOGS
router.get("/session-logs", controlController.getSessionLogs);


// Example:
router.get("/active-users", authMiddleware, controlController.getActiveUsers);
module.exports = router;