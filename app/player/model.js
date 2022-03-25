const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;
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
    username: {
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

//cek email
playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

//has password
playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
