exports.listFurnitures = async (req, res) => {
  res
    .status(200)
    .render("furnitures", {
      pageName: "furnitures",
      title: "Furnitures - Furtone",
    });
};
