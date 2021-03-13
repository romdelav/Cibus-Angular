var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');

var dbConnection = path.join(__dirname + '/CibusLLC.db');
console.log(dbConnection);
const db = require('better-sqlite3')(dbConnection, { verbose: console.log });

var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('App initalized on port ' + port);
});

app.route('/recipes')
    .get((req, res) =>
        res.send(JSON.stringify(getAllRecipes(), null, 2)));

app.route('/recipes/:Recipe_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getRecipe(req.params.Recipe_ID), null, 2)));

app.route('/vegan-recipes')
    .get((req, res) =>
        res.send(JSON.stringify(getVeganRecipes(), null, 2)));

app.route('/vegetarian-recipes')
    .get((req, res) =>
        res.send(JSON.stringify(getVegetarianRecipes(), null, 2)));

app.route('/meat-recipes')
    .get((req, res) =>
        res.send(JSON.stringify(getMeatRecipes(), null, 2)));

app.route('/sides')
    .get((req, res) =>
        res.send(JSON.stringify(getSides(), null, 2)));

app.route('/salads')
    .get((req, res) =>
        res.send(JSON.stringify(getSalads(), null, 2)));

app.route('/soups')
    .get((req, res) =>
        res.send(JSON.stringify(getSoups(), null, 2)));

app.route('/add-recipe')
    .post((req, res) => {
        console.log(req.body)

        var Recipe_Name = req.body.Recipe_Name;
        var Servings = req.body.Servings;
        var Cooking_Instructions = req.body.Cooking_Instructions;
        var Description = req.body.Description;

        var Ingredient_ID1 = req.body.Ingredient_ID1;
        var Measurement_ID1 = req.body.Measurement_ID1;

        var Ingredient_ID2 = req.body.Ingredient_ID2;
        var Measurement_ID2 = req.body.Measurement_ID2;

        var stmt1 = db.prepare('INSERT INTO Recipe (Recipe_Name, Servings, Cooking_Instructions, Description) VALUES (?, ?, ?, ?)');
        stmt1.run(Recipe_Name, Servings, Cooking_Instructions, Description);

        var stmt2 = db.prepare('INSERT INTO Recipe_Ingredient (Recipe_ID, Ingredient_ID, Measurement_ID) VALUES ((SELECT Recipe_ID FROM Recipe WHERE Recipe_Name = ?), ?, ?)');
        stmt2.run(Recipe_Name, Ingredient_ID1, Measurement_ID1);

        var stmt3 = db.prepare('INSERT INTO Recipe_Ingredient (Recipe_ID, Ingredient_ID, Measurement_ID) VALUES ((SELECT Recipe_ID FROM Recipe WHERE Recipe_Name = ?), ?, ?)');
        stmt3.run(Recipe_Name, Ingredient_ID2, Measurement_ID2);
    });

app.route('/update-recipe/:Recipe_ID')
    .put((req, res) => {
        console.log(req.body)

        var Recipe_ID = req.params.Recipe_ID;
        var Recipe_Name = req.body.Recipe_Name;
        var Servings = req.body.Servings;
        var Cooking_Instructions = req.body.Cooking_Instructions;
        var Description = req.body.Description;
        var Ingredient_ID1 = req.body.Ingredient_ID1;
        var Measurement_ID1 = req.body.Measurement_ID1;
        var Ingredient_ID2 = req.body.Ingredient_ID2;
        var Measurement_ID2 = req.body.Measurement_ID2;

        var stmt1 = db.prepare('DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ? ');
        stmt1.run(Recipe_ID);

        var stmt2 = db.prepare('DELETE FROM Recipe_Category WHERE Recipe_ID = ? ');
        stmt2.run(Recipe_ID);

        var stmt3 = db.prepare('DELETE FROM Recipe WHERE Recipe_ID = ? ');
        stmt3.run(Recipe_ID);

        var stmt4 = db.prepare('INSERT INTO Recipe (Recipe_Name, Servings, Cooking_Instructions, Description) VALUES (?, ?, ?, ?)');
        stmt4.run(Recipe_Name, Servings, Cooking_Instructions, Description);

        var stmt5 = db.prepare('INSERT INTO Recipe_Ingredient (Recipe_ID, Ingredient_ID, Measurement_ID) VALUES ((SELECT Recipe_ID FROM Recipe WHERE Recipe_Name = ?), ?, ?)');
        stmt5.run(Recipe_Name, Ingredient_ID1, Measurement_ID1);

        var stmt6 = db.prepare('INSERT INTO Recipe_Ingredient (Recipe_ID, Ingredient_ID, Measurement_ID) VALUES ((SELECT Recipe_ID FROM Recipe WHERE Recipe_Name = ?), ?, ?)');
        stmt6.run(Recipe_Name, Ingredient_ID2, Measurement_ID2);
    })

app.route('/delete-recipe/:Recipe_ID')
    .delete((req, res) => {
        var Recipe_ID = req.params.Recipe_ID;

        var stmt1 = db.prepare('DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ?');
        stmt1.run(Recipe_ID);

        var stmt2 = db.prepare('DELETE FROM Recipe_Category WHERE Recipe_ID = ?');
        stmt2.run(Recipe_ID);

        var stmt3 = db.prepare('DELETE FROM Recipe WHERE Recipe_ID = ?');
        stmt3.run(Recipe_ID);
    })

app.route('/ingredients')
    .get((req, res) =>
        res.send(JSON.stringify(getAllIngredients(), null, 2)));

app.route('/ingredients/:Ingredient_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getIngredient(req.params.Ingredient_ID), null, 2)));

app.route('/add-ingredient')
    .post((req, res) => {
        console.log(req.body)

        var Ingredient_Name = req.body.Ingredient_Name;
        var Protein = req.body.Protein;
        var Carbohydrate = req.body.Carbohydrate;
        var Sugar = req.body.Sugar;
        var Fat = req.body.Fat;
        var Sodium = req.body.Sodium;
        var Calories = req.body.Calories;


        var stmt = db.prepare('INSERT INTO Ingredient (Ingredient_Name, Protein, Carbohydrate, Sugar, Fat, Sodium, Calories) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt.run(Ingredient_Name, Protein, Carbohydrate, Sugar, Fat, Sodium, Calories);
    });

app.route('/update-ingredient/:Ingredient_ID')
    .put((req, res) => {
        console.log(req.body)

        var Ingredient_Name = req.body.Ingredient_Name;
        var Protein = req.body.Protein;
        var Carbohydrate = req.body.Carbohydrate;
        var Sugar = req.body.Sugar;
        var Fat = req.body.Fat;
        var Sodium = req.body.Sodium;
        var Calories = req.body.Calories;
        var Ingredient_ID = req.params.Ingredient_ID;

        var stmt = db.prepare('UPDATE Ingredient SET Ingredient_Name = ?, Protein = ?, Carbohydrate = ?, Sugar = ?, Fat = ?, Sodium = ?, Calories = ? WHERE Ingredient_ID = ?');
        stmt.run(Ingredient_Name, Protein, Carbohydrate, Sugar, Fat, Sodium, Calories, Ingredient_ID);
    });

app.route('/delete-ingredient/:Ingredient_ID')
    .delete((req, res) => {
        var Ingredient_ID = req.params.Ingredient_ID;

        var stmt1 = db.prepare('DELETE FROM Recipe_Ingredient WHERE Ingredient_ID = ?');
        stmt1.run(Ingredient_ID);

        var stmt2 = db.prepare('DELETE FROM Ingredient_Category WHERE Ingredient_ID = ?');
        stmt2.run(Ingredient_ID);

        var stmt3 = db.prepare('DELETE FROM Ingredient WHERE Ingredient_ID = ?');
        stmt3.run(Ingredient_ID);
    })

app.route('/measurements')
    .get((req, res) =>
        res.send(JSON.stringify(getAllMeasurements(), null, 2))
    );

app.route('/measurements/:Measurement_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getMeasurementByID(req.params.Measurement_ID)))
    );

app.route('/categories')
    .get((req, res) =>
        res.send(JSON.stringify(getAllCategories(), null, 2))
    );

app.route('/categories/:Category_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getCategory(req.params.Category_ID)))
    );

app.route('/add-category')
    .post((req, res) => {
        var Category_Name = req.body.Category_Name;

        var stmt = db.prepare('INSERT INTO Category (Category_Name) VALUES (?)');
        stmt.run(Category_Name);
    })

function getAllRecipes() {
    const recipes = db.prepare('SELECT * FROM Recipe').all();
    return recipes;
};

function getVeganRecipes() {
    const veganRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${2}`).all();
    return veganRecipes;
}

function getVegetarianRecipes() {
    const vegetarianRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${3}`).all();
    return vegetarianRecipes;
}

function getMeatRecipes() {
    const meatRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${1}`).all();
    return meatRecipes;
}

function getSides() {
    const sides = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${12}`).all();
    return sides;
}

function getSalads() {
    const salads = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${14}`).all();
    return salads;
}

function getSoups() {
    const soups = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${13}`).all();
    return soups;
}

function getRecipe(Recipe_ID) {
    var recipe = { Recipe_ID: 0, User_ID: 0, Recipe_Name: "Template", Cooking_Instructions: "", Servings: 0, Description: "", Image_URL: "", MeasurementIngredient: [], Categories: [] };

    const row = db.prepare('SELECT * FROM Recipe WHERE Recipe_ID = ' + Recipe_ID).get();
    recipe.Recipe_ID = row.Recipe_ID;
    recipe.User_ID = row.User_ID;
    recipe.Recipe_Name = row.Recipe_Name;
    recipe.Servings = row.Servings;
    recipe.Cooking_Instructions = row.Cooking_Instructions;
    recipe.Description = row.Description;
    recipe.Image_URL = row.Image_URL;

    const categoriesDB = db.prepare('SELECT Recipe_Category.Recipe_ID, Category_Name FROM Category JOIN Recipe_Category ON Category.Category_ID = Recipe_Category.Category_ID WHERE Recipe_ID =' + Recipe_ID).all();
    var categories = categoriesDB;
    recipe.Categories = categories;

    const measurementIngredientDB = db.prepare('SELECT Amount, Measurement_Type, Ingredient_Name FROM Recipe_Ingredient JOIN Measurement ON Recipe_Ingredient.Measurement_ID = Measurement.Measurement_ID JOIN Ingredient ON Recipe_Ingredient.Ingredient_ID = Ingredient.Ingredient_ID JOIN Recipe ON Recipe_Ingredient.Recipe_ID = Recipe.Recipe_ID WHERE Recipe.Recipe_ID =' + Recipe_ID).all();
    var measurementsIngredients = measurementIngredientDB;
    recipe.MeasurementIngredient = measurementsIngredients;

    return recipe;
}

function getAllIngredients() {
    const ingredients = db.prepare('SELECT * FROM Ingredient ORDER BY Ingredient_Name').all();
    return ingredients;
}

function getIngredient(Ingredient_ID) {
    var ingredient = { Ingredient_ID: 0, User_ID: 0, Ingredient_Name: "Template", Protein: 0, Carbohydrate: 0, Sugar: 0, Fat: 0, Sodium: 0, Calories: 0, Image_URL: "", Categories: [] };

    const row = db.prepare('SELECT * FROM Ingredient WHERE Ingredient_ID =' + Ingredient_ID).get();
    ingredient.Ingredient_ID = row.Ingredient_ID;
    ingredient.User_ID = row.User_ID;
    ingredient.Ingredient_Name = row.Ingredient_Name;
    ingredient.Protein = row.Protein;
    ingredient.Carbohydrate = row.Carbohydrate;
    ingredient.Sugar = row.Sugar;
    ingredient.Fat = row.Fat;
    ingredient.Sodium = row.Sodium;
    ingredient.Calories = row.Calories;
    ingredient.Image_URL = row.Image_URL;

    const categoriesDB = db.prepare('SELECT Ingredient_Category.Ingredient_ID, Category_Name FROM Category JOIN Ingredient_Category ON Category.Category_ID = Ingredient_Category.Category_ID WHERE Ingredient_ID =' + Ingredient_ID).all();
    var categories = categoriesDB;
    ingredient.Categories = categories;

    return ingredient;
}

function getAllMeasurements() {
    const measurements = db.prepare('SELECT * FROM Measurement ORDER BY Measurement_Type, Amount').all();
    return measurements;
}

function getMeasurementByID(Measurement_ID) {
    var measurement = { Measurement_ID: 0, Measurement_Type: "", Amount: 0, };

    const row = db.prepare(`SELECT * FROM Measurement WHERE Measurement_ID = ${Measurement_ID}`).get();
    measurement.Measurement_ID = row.Measurement_ID;
    measurement.Measurement_Type = row.Measurement_Type;
    measurement.Amount = row.Amount;

    return measurement;

}

function getAllCategories() {
    const categories = db.prepare('SELECT * FROM Category').all();
    return categories;
}

function getCategory(Category_ID) {
    var category = { Category_ID: 0, Category_Name: "" };

    const row = db.prepare(`SELECT * FROM Category WHERE Category_ID = ${Category_ID}`).get();
    category.Category_ID = row.Category_ID;
    category.Category_Name = row.Category_Name;

    return category;
}