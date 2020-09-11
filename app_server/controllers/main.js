const index = (req, res) => {
  res.render("index", {
    title: "Express & Nodemon by WooSeob Byun 2016250033",
  });
};

module.exports = {
  index,
};
