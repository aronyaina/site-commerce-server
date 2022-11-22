const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    description: "String",
    price: {
        type: 'Number',
        required: true
    }
})


// Save product function
productSchema.statics.saveProduct = async function(name, description, price) {
    const nameExist = await this.findOne({
        name
    });

    if (nameExist) {
        throw Error('Product already exists');
    }
    if (price <= 0) {
        throw Error('Price equal to zero or less')
    }

    const product = await this.create({
        name,
        description,
        price
    })
    return product;
}

// Delete product function
productSchema.statics.deleteProduct = async function(id) {

    const deletedObject = await this.findOneAndDelete({
        _id: id
    })

    return deletedObject;
}

// Find product function
productSchema.statics.findProduct = async function() {
    const products = await this.find({})
    return products;
}

// Find one product function
productSchema.statics.findOneProduct = async function(id) {
    const products = await this.findById({
        _id: id
    })
    return products;

}

// Find one product function
productSchema.statics.updateProduct = async function(id, name, description, price) {
    const product_id = await this.findOne({
        _id: id
    })

    const product = await this.findOneAndUpdate({
        _id: products_id,
    }, {
        name: name,
        description: description,
        price: price
    })
    return product;
}


// exports shema
module.exports = mongoose.model('product', productSchema)