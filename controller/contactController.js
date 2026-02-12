const Contact = require("../modules/Contact");

/* CREATE CONTACT / BOOKING */
exports.createContact = async (req, res) => {
  try {
    const { name, phone, service, preferredDate, message } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({
        message: "Name, phone and service are required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone must be 10 digits",
      });
    }

    const existing = await Contact.findOne({ phone, preferredDate });

    if (existing) {
      return res.status(400).json({
        message: "Booking already exists for this date",
      });
    }

    const contact = await Contact.create({
      name,
      phone,
      service,
      preferredDate,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      data: contact,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ALL CONTACTS */
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET SINGLE CONTACT */
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* DELETE CONTACT */
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
