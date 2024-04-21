const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Gofood");
        console.log("Connection successful");

        // Access the collection directly
        const collection = mongoose.connection.db.collection('food_items');

        // Fetch all documents from the collection
        const data = await collection.find({}).toArray();
        const foodCategory =mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();
        global.food_items=data;
        global.foodCategory=catData;
        // console.log(global.food_items);
    } catch (err) {
        console.error("Error:", err);
};
}

module.exports = mongoDB;