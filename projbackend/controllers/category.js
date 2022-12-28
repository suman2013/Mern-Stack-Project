const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err){
      return res.status(400).json({
        error:"Category not found",
      })
    }
    req.category = category;
    next();
  })
}

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, cat) => {
    if(err){
      return res.status(400).json({
        error:"Not able to save category"
      })
    }
    return res.status(200).json(cat);
  })
}

exports.getCategory = (req, res) => {
  return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if(err){
      return res.status(400).json({
        error:"No category found",
      })
    }
    return res.status(200).json(categories);
  })
}

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name

  category.save((err, category) => {
    if(err){
      return res.status(400).json({
        error: "unable to update category"
      })
    }
    return res.status(200).json(category);
  })
}

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if(err){
      return res.status(400).json({
        error: "unable to remove category"
      })
    }
    return res.status(200).json(
      {message: "Succefully removed category"}
    )
  })
}
