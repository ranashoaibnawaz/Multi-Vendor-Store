const Products = require("./Models/ProductSchema");

const ProductData = require("./Constant/ProductData");

const DefaultData = async()=>{
    try {
            await Products.deleteMany({});
            const storeData= await Products.insertMany(ProductData);
            console.log(storeData);
    } catch (error) {
            console.log("Error"+error.message);
    }
};

module.exports = DefaultData;