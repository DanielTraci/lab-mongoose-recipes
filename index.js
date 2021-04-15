const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    /*let myRecipe = {
      title: "Salad",
      level: "Easy Peasy",
      ingredients: ["tomato", "noodles", "chicken"],
      cuisine: "French",
      dishType: "main_course",
      image: "",
      duration: 6,
      creator: "Cheff",
    };
    return Recipe.create(myRecipe);*/

    return Recipe.insertMany(data);
  })

  .then((data) => {
    //return Recipe.findOneAndUpdate({title: Rigatoni alla Genovese}, {duration: 100})})
    console.log("Inserted many");
    return Recipe.findByIdAndUpdate("60786d267f3f69217a2bda12", {
      duration: 100,
    });
  })

  .then((data) => {
    console.log("Duration updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((data) => {
    console.log("Deletion completed");
    mongoose.connection
      .close()
      .then(() => {
        console.log("Closed");
      })
      .catch((error) => {
        console.error("Closing database connection failed");
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

/*
 */
