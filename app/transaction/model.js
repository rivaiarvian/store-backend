const mongoose = require("mongoose");
let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "Nama game harus diisi"] },
      category: { type: String, require: [true, "Nama category harus diisi"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Nama coin harus diisi"] },
      coinQuantity: {
        type: String,
        require: [true, "Jumlah coin harus diisi"],
      },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "Nama harus diisi"] },
      type: { type: String, require: [true, "Tipe pembayaran harus diisi"] },
      nameBank: { type: String, require: [true, "Nama bank harus diisi"] },
      noRekening: {
        type: String,
        require: [true, "Nomor rekening harus diisi"],
      },
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxLenght: [255, "Panjang nama harus antara 3-255 karakter"],
      minLenght: [3, "Panjang nama harus antara 3-255 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Nama akunharus diisi"],
      maxLenght: [255, "Panjang nama harus antara 3-255 karakter"],
      minLenght: [3, "Panjang nama harus antara 3-255 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: {
        type: String,
        require: [true, "Nama player harus diisi"],
      },
      phoneNumber: {
        type: Number,
        require: [true, "Nomor telepon harus diisi"],
        maxLenght: [13, "Panjang nama harus antara 9-13 karakter"],
        minLenght: [9, "Panjang nama harus antara 9-13 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
