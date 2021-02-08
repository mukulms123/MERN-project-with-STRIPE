const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        err: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save the category in DB",
      });
    }
    return res.json({category});
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        err: "No categories",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  var category = req.category;
  category.name = req.body.name;
  category.save((err, newCategory) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to update category",
      });
    }
    return res.json(newCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "failed to delete this category",
      });
    }
    return res.json({
      message: `Successfull deleted ${category.name}`,
    });
  });
};
