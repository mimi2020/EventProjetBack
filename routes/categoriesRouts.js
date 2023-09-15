var express = require("express");
const upload = require("../middelware/upload");

const CategoriesRoute = express.Router();

const CategorieController = require("../controllers/categorieController");

CategoriesRoute.post("/Create", upload.single("photo"), CategorieController.createCategorie);
CategoriesRoute.get("/List", CategorieController.listCategories);
CategoriesRoute.delete("/Delete/:id", CategorieController.deletetCategorie);
CategoriesRoute.get("/GetOne/:id", CategorieController.FindCategorie);
CategoriesRoute.put("/Update/:id", CategorieController.UpDateCategorie);
CategoriesRoute.put("/UpdatePhoto/:id", upload.single("photo"), CategorieController.UpDateCategorieWithPhoto);



module.exports = CategoriesRoute