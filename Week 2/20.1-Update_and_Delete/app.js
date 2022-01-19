const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");

const app = express();
app.use(express.json());

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

app.post("/products/add", async (req, res) => {
    const product1 = new Product(req.body);
    try {
        await product1.save();
        res.status(201).send(product1);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/products/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Couldn't find product");
        }
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/products/active", async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        if (!products) {
            return res.status(404).send("Couldn't find products");
        }
        res.status(200).send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/products/price", async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;

    try {
        const products = await Product.find({
            "details.price": { $gte: min, $lte: max },
        });
        if (!products) {
            return res.status(404).send("Couldn't find products");
        }
        res.status(200).send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.patch("/products/id/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["isActive", "details.discount"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return res.status(400).send("Error: invalid updates!");
    }

    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).send("Couldn't find product");
        }
        res.status(200).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete("/products/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send("Couldn't find product");
        }
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.delete("/products", async (req, res) => {
    try {
        const products = await Product.deleteMany({});

        if (!products) {
            return res.status(404).send("Couldn't find products");
        }
        res.status(200).send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
