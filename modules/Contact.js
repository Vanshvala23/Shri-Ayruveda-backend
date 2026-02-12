const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    service: {
      type: String,
      required: true,
      enum: [
        "Panchakarma",
        "Abhyangam Massage",
        "Doctor Consultation",
        "Vamana (Therapeutic Emesis)",
        "Virechana (Purgation)",
        "Basti (Medicated Enema)",
        "Shirodhara",
        "Potli Massage (Bolus Therapy)",
        "Kati Basti (Lower Back Care)",
        "Udvartana (Powder Massage)",
        "Takradhara",
        "Mukha Lepam (Ayurvedic Facial)",
      ],
    },

    preferredDate: {
      type: Date,
    },

    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
