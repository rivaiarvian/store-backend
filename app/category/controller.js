module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Express JS",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
