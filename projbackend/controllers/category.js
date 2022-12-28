const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err){
      return res.status(400).json({
        error:"Category not found",
      })
    }
    req.category = catgory;
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
