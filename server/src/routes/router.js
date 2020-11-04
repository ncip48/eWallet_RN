const express = require("express");
const router = express.Router();

const { uploadImage } = require("../middleware/upload");

const {
  getAllUser,
  getUserById,
  updateProfile,
} = require("../controller/user");

const { register, login, pin, checkAuth } = require("../controller/auth");

const {
  getTransaction,
  getTransactionSend,
  detailTransaction,
  getTransactionById,
  makeTransaction,
  topUpGojek,
  topUpStore,
} = require("../controller/transaction");

const { getNotification, handling } = require("../controller/notification");

const { authenticated } = require("../middleware/authentication");

router.get("/users", getAllUser);
router.get("/user/:id", getUserById);
router.patch("/user", uploadImage("photo"), authenticated, updateProfile);

router.post("/register", register);
router.post("/login", login);
router.post("/pin", pin);
router.get("/auth", authenticated, checkAuth);

router.get("/transactions", authenticated, getTransaction);
router.get("/transaction-send", authenticated, getTransactionSend);
router.get("/transaction/:id", authenticated, detailTransaction);
router.get("/transaction-user/:id", authenticated, getTransactionById);
router.post("/transaction", authenticated, makeTransaction);

router.post("/topup-gopay", authenticated, topUpGojek);
router.post("/test-midtrans-2", authenticated, topUpStore);

router.get("/notification", authenticated, getNotification);
router.post("/notification/handling", handling);

router
  .get("*", function (req, res) {
    res.status(404).send({
      error: {
        message: "route not found",
      },
    });
  })
  .post("*", function (req, res) {
    res.status(404).send({
      error: {
        message: "route not found",
      },
    });
  });

module.exports = router;
