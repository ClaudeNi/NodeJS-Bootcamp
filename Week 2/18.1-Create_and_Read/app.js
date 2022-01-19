const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/products", {
    useNewUrlParser: true,
});

const Product = mongoose.model("Product", {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    isActive: { type: Boolean },
    details: {
        description: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 10) {
                    throw new Error(
                        "Description should be at least 10 letters"
                    );
                }
            },
        },
        price: {
            type: Number,
            required: true,
            validate(value) {
                if (value <= 0) {
                    throw new Error("Price must be a positive number.");
                }
            },
        },
        discount: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            required: true,
            validate(value) {
                if (value.length < 2) {
                    throw new Error(
                        "Product should include at least 2 images."
                    );
                }
            },
        },
        phone: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isMobilePhone(value, "he-IL")) {
                    throw new Error(
                        "Phone number must be a valid Israeli number."
                    );
                }
            },
        },
        dateAdded: {
            type: Date,
            default: new Date(),
        },
    },
});

app.get("/products", (req, res) => {
    Product.find({}, (error, result) => {
        if (error) {
            res.status(400).send("Unable to fetch products");
        }
        res.status(200).send(result);
    });
});

app.get("/products/id/:id", (req, res) => {
    const id = req.params.id;
    Product.find({ _id: id }, (error, result) => {
        if (error) {
            res.status(400).send(`Unable to fetch product with ID "${id}"`);
        }
        res.status(200).send(result);
    });
});

app.get("/products/active", (req, res) => {
    Product.find({ isActive: true }, (error, result) => {
        if (error) {
            res.status(400).send("Unable to fetch products");
        }
        res.status(200).send(result);
    });
});

app.get("/products/price", (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    Product.find(
        {
            "details.price": { $gte: min, $lte: max },
        },
        (error, result) => {
            if (error) {
                res.status(400).send("Unable to fetch products");
            }
            res.status(200).send(result);
        }
    );
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
