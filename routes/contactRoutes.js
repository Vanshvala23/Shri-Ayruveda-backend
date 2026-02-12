const express = require("express");
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controller/contactController");

const router = express.Router();

/* CREATE BOOKING */
router.post("/", createContact);

/* GET ALL BOOKINGS */
router.get("/", getAllContacts);

/* GET SINGLE BOOKING */
router.get("/:id", getContactById);

/* DELETE BOOKING */
router.delete("/:id", deleteContact);

module.exports = router;
