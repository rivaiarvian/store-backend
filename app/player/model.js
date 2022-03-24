const mongoose = require("mongoose");
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxLenght: [225, "Panjang nama harus antara 3-225 karakter"],
      minLenght: [3, "Panjang nama harus antara 3-225 karakter"],
    },
    userName: {
      type: String,
      require: [true, "User name harus diisi"],
      maxLenght: [225, "Panjang nama harus antara 3-225 karakter"],
      minLenght: [3, "Panjang nama harus antara 3-225 karakter"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
      maxLenght: [225, "Panjang nama harus antara 225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: { type: String },
    fileName: { type: String },
    phoneNumber: {
      type: String,
      require: [true, "Nomor telepon harus diisi"],
      maxLenght: [13, "Panjang nomor telepon harus antara 9-13 karakter"],
      minLenght: [9, "Panjang nomor telepon harus antara 9-13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
