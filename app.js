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

app.route('/grain-recipes')
    .get((req, res) =>
        res.send(JSON.stringify(getGrainRecipes(), null, 2)));

app.route('/add-recipe')
    .post((req, res) => {
        console.log(req.body)

        var Recipe_Name = req.body.Recipe_Name;
        var Servings = req.body.Servings;
        var Cooking_Instructions = req.body.Cooking_Instructions;
        var Description = req.body.Description;
        var Image_URL = "placeholder.jpg"

        var Ingredient_ID1 = req.body.Ingredient_ID1;
        var Measurement_ID1 = req.body.Measurement_ID1;

        var Ingredient_ID2 = req.body.Ingredient_ID2;
        var Measurement_ID2 = req.body.Measurement_ID2;

        var stmt1 = db.prepare('INSERT INTO Recipe (Recipe_Name, Servings, Cooking_Instructions, Description, Image_URL) VALUES (?, ?, ?, ?)');
        stmt1.run(Recipe_Name, Servings, Cooking_Instructions, Description, Image_URL);

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

app.route('/meat')
    .get((req, res) =>
        res.send(JSON.stringify(getMeatIngredients(), null, 2)));

app.route('/vegetables')
    .get((req, res) =>
        res.send(JSON.stringify(getVegetables(), null, 2)));

app.route('/fruits')
    .get((req, res) =>
        res.send(JSON.stringify(getFruits(), null, 2)));

app.route('/grains')
    .get((req, res) =>
        res.send(JSON.stringify(getGrainIngredients(), null, 2)));

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
    });

app.route('/providers')
    .get((req, res) =>
        res.send(JSON.stringify(getProviders(), null, 2))
    );

app.route('/providers/:User_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getIngredientsByProvider(req.params.User_ID), null, 2))
    );

app.route('/ingredients/:Ingredient_ID/providers')
    .get((req, res) =>
        res.send(JSON.stringify(getProvidersByIngredient(req.params.Ingredient_ID), null, 2))
    );

app.route('/blog-articles')
    .get((req, res) =>
        res.send(JSON.stringify(getBlogArticles(), null, 2))
    );

app.route('/blog-articles/:Article_ID')
    .get((req, res) =>
        res.send(JSON.stringify(getBlogArticle(req.params.Article_ID), null, 2))
    );

app.route('/blog-articles/:Article_ID')
    .post((req, res) => {
        console.log(req.body)

        var Username = req.body.Username;
        var Text = req.body.Text;
        var Article_ID = req.params.Article_ID;

        var stmt1 = db.prepare('INSERT INTO Comment (Username, Text, Created_At) VALUES (?, ?, ?)');
        stmt1.run(Username, Text, Date('now'));

        var stmt2 = db.prepare('INSERT INTO Comment_Article (Comment_ID, Article_ID) VALUES ((SELECT Comment_ID FROM Comment WHERE Text = ?), ?)');
        stmt2.run(Text, Article_ID);
    });

function getAllRecipes() {
    const recipes = db.prepare('SELECT * FROM Recipe ORDER BY Recipe_Name').all();
    return recipes;
};

function getVeganRecipes() {
    const veganRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${2} ORDER BY Recipe_Name`).all();
    return veganRecipes;
}

function getVegetarianRecipes() {
    const vegetarianRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${3} ORDER BY Recipe_Name`).all();
    return vegetarianRecipes;
}

function getMeatRecipes() {
    const meatRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${1} ORDER BY Recipe_Name`).all();
    return meatRecipes;
}

function getSides() {
    const sides = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${12} ORDER BY Recipe_Name`).all();
    return sides;
}

function getSalads() {
    const salads = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${14} ORDER BY Recipe_Name`).all();
    return salads;
}

function getSoups() {
    const soups = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${13} ORDER BY Recipe_Name`).all();
    return soups;
}

function getGrainRecipes() {
    const grainRecipes = db.prepare(`Select * FROM Recipe JOIN Recipe_Category ON Recipe.Recipe_ID = Recipe_Category.Recipe_ID JOIN Category ON Recipe_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${5} ORDER BY Recipe_Name`).all();
    return grainRecipes;
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

function getMeatIngredients() {
    const meatIngredients = db.prepare(`Select * FROM Ingredient JOIN Ingredient_Category ON Ingredient.Ingredient_ID = Ingredient_Category.Ingredient_ID JOIN Category ON Ingredient_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${1} ORDER BY Ingredient_Name`).all();
    return meatIngredients;
}

function getVegetables() {
    const vegetables = db.prepare(`Select * FROM Ingredient JOIN Ingredient_Category ON Ingredient.Ingredient_ID = Ingredient_Category.Ingredient_ID JOIN Category ON Ingredient_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${6} ORDER BY Ingredient_Name`).all();
    return vegetables;
}

function getFruits() {
    const fruits = db.prepare(`Select * FROM Ingredient JOIN Ingredient_Category ON Ingredient.Ingredient_ID = Ingredient_Category.Ingredient_ID JOIN Category ON Ingredient_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${7} ORDER BY Ingredient_Name`).all();
    return fruits;
}

function getGrainIngredients() {
    const grainIngredients = db.prepare(`Select * FROM Ingredient JOIN Ingredient_Category ON Ingredient.Ingredient_ID = Ingredient_Category.Ingredient_ID JOIN Category ON Ingredient_Category.Category_ID = Category.Category_ID WHERE Category.Category_ID = ${5} ORDER BY Ingredient_Name`).all();
    return grainIngredients;
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

function getProviders() {
    const providers = db.prepare(`SELECT User.User_ID, First_Name, Last_Name, Image_URL, Job_Description, Organization_Name, Address, City, State, PostCode, Phone FROM User JOIN Organization ON User.Organization_ID = Organization.Organization_ID JOIN User_Address on User.User_ID = User_Address. User_ID JOIN Address ON User_Address.Address_ID = Address.Address_ID JOIN User_Role ON User.User_ID = User_Role.User_ID JOIN Role ON User_Role.Role_ID = Role.Role_ID WHERE Role.Role_ID = ${2} ORDER BY Last_Name`).all();
    return providers;
}

function getIngredientsByProvider(User_ID) {
    const providerIngredients = db.prepare(`SELECT * FROM Ingredient WHERE User_ID = ${User_ID}`).all();
    return providerIngredients;
}

function getProvidersByIngredient(Ingredient_ID) {
    const ingredientProviders = db.prepare(`SELECT User.User_ID, First_Name, Last_Name, User.Image_URL, Job_Description, Organization_Name, Address, City, State, PostCode, Phone FROM User JOIN Organization ON User.Organization_ID = Organization.Organization_ID JOIN User_Address on User.User_ID = User_Address. User_ID JOIN Address ON User_Address.Address_ID = Address.Address_ID JOIN User_Role ON User.User_ID = User_Role.User_ID JOIN Role ON User_Role.Role_ID = Role.Role_ID JOIN Ingredient ON Ingredient.User_ID = User.User_ID WHERE Role.Role_ID = ${2} AND Ingredient_ID = ${Ingredient_ID}`).all();
    return ingredientProviders;
}

function getBlogArticles() {
    const blogArticles = db.prepare(`SELECT Article.Article_ID, Title, Summary, Image_URL1, Reading_Time, Date, User.First_Name, User.Last_Name FROM Article Join User_Article ON Article.Article_ID = User_Article.Article_ID JOIN User ON User_Article.User_ID = User.User_ID ORDER BY Article.Article_ID DESC`).all();
    return blogArticles;
}

function getBlogArticle(Article_ID) {
    var blogArticle = {
        Article_ID: 0,
        Title: "",
        Summary: "",
        Image_URL1: "",
        Image_URL2: "",
        Image_URL3: "",
        Image_URL4: "",
        Image_URL5: "",
        Paragraph1: "",
        Paragraph2: "",
        Paragraph3: "",
        Paragraph4: "",
        Paragraph5: "",
        Reading_Time: 0,
        Date: "",
        First_Name: "",
        Last_Name: "",
        Comments: []
    };
    const row = db.prepare(`SELECT Article.Article_ID, Title, Summary, Image_URL1, Image_URL2, Image_URL3, Image_URL4, Image_URL5, Paragraph1, Paragraph2, Paragraph3, Paragraph4, Paragraph5, Reading_Time, Date, User.First_Name, User.Last_Name FROM Article Join User_Article ON Article.Article_ID = User_Article.Article_ID JOIN User ON User_Article.User_ID = User.User_ID WHERE Article.Article_ID = ${Article_ID}`).get();
    blogArticle.Article_ID = row.Article_ID;
    blogArticle.Title = row.Title;
    blogArticle.Summary = row.Summary;
    blogArticle.Image_URL1 = row.Image_URL1;
    blogArticle.Image_URL2 = row.Image_URL2;
    blogArticle.Image_URL3 = row.Image_URL3;
    blogArticle.Image_URL4 = row.Image_URL4;
    blogArticle.Image_URL5 = row.Image_URL5;
    blogArticle.Paragraph1 = row.Paragraph1;
    blogArticle.Paragraph2 = row.Paragraph2;
    blogArticle.Paragraph3 = row.Paragraph3;
    blogArticle.Paragraph4 = row.Paragraph4;
    blogArticle.Paragraph5 = row.Paragraph5;
    blogArticle.Reading_Time = row.Reading_Time;
    blogArticle.Date = row.Date;
    blogArticle.First_Name = row.First_Name;
    blogArticle.Last_Name = row.Last_Name;

    const commentsDB = db.prepare(`SELECT Comment.Comment_ID, Comment.Username, Comment.Text, Comment.Created_At FROM Comment JOIN Comment_Article ON Comment.Comment_ID = Comment_Article.Comment_ID JOIN Article on Comment_Article.Article_ID = Article.Article_ID WHERE Article.Article_ID = ${Article_ID}`).all();
    var comments = commentsDB;
    blogArticle.Comments = comments;

    return blogArticle;
}