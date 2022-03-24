const Player = require("./model");

const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const player = await Player.find();
      res.render("admin/player/view_player", {
        player,
        alert,
        name: req.session.user.name,
        title: "Halaman Player",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/player/create", {
        name: req.session.user.name,
        title: "Halaman tambah player",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, username, email, password, phoneNumber } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/images/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const player = new Player({
              name,
              username,
              email,
              password,
              phoneNumber,
              avatar: filename,
            });

            await player.save();
            req.flash("alertMessage", "Berhasil tambah player");
            req.flash("alertStatus", "success");

            res.redirect("/player");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/player");
          }
        });
      } else {
        const player = new Player({
          name,
          username,
          email,
          password,
          phoneNumber,
        });

        await player.save();

        req.flash("alertMessage", "Berhasil tambah player");
        req.flash("alertStatus", "success");

        res.redirect("/player");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const player = await Player.findOne({ _id: id });
      res.render("admin/player/edit", {
        player,
        name: req.session.user.name,
        title: "Halaman ubah player",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, username, email, password, phoneNumber } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/images/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const player = await Player.findOne({ _id: id });
            let currentImage = `${config.rootPath}/public/images/${player.avatar}`;
            // Jika ada image akan di hapus
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Player.findOneAndUpdate(
              { _id: id },
              {
                name,
                username,
                email,
                password,
                phoneNumber,
                avatar: filename,
              }
            );
            req.flash("alertMessage", "Berhasil ubah player");
            req.flash("alertStatus", "success");

            res.redirect("/player");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/player");
          }
        });
      } else {
        await Player.findOneAndUpdate(
          { _id: id },
          {
            name,
            username,
            email,
            password,
            phoneNumber,
          }
        );

        req.flash("alertMessage", "Berhasil ubah player");
        req.flash("alertStatus", "success");

        res.redirect("/player");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const player = await Player.findOneAndRemove({ _id: id });
      let currentImage = `${config.rootPath}/public/images/${player.avatar}`;
      // Jika ada image akan di hapus
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash("alertMessage", "Berhasil hapus voucher");
      req.flash("alertStatus", "success");

      res.redirect("/player");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/player");
    }
  },
};
