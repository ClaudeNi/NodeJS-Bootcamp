const mongoose = require("mongoose");
const validator = require("validator");

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

const product1 = new Product({
    name: "Nintendo Switch",
    category: "Gaming",
    isActive: true,
    details: {
        description: "Nintendo Switch console",
        price: 1385,
        discount: 0,
        images: [
            "https://img.ksp.co.il/item/72971/b_1.jpg?v=5",
            "https://img.ksp.co.il/item/72971/b_2.jpg?v=5",
        ],
        phone: "+972506080709",
        dateAdded: new Date(),
    },
});
product1.save();

const product2 = new Product({
    name: "Xbox Series X",
    category: "Gaming",
    isActive: true,
    details: {
        description: "Microsoft Xbox Series X",
        price: 2279,
        images: [
            "https://img.ksp.co.il/item/115991/b_13.jpg?v=5",
            "https://img.ksp.co.il/item/115991/b_2.jpg?v=5",
        ],
        phone: "0506063718",
    },
});
product2.save();

const product3 = new Product({
    name: "DualShock 4",
    category: "Gaming",
    isActive: true,
    details: {
        description: "Sony PlayStation 4 DualShock 4 V2",
        price: 259,
        images: [
            "https://img.ksp.co.il/item/92850/b_2.jpg?v=5",
            "https://img.ksp.co.il/item/92850/b_3.jpg?v=5",
        ],
        phone: "+972506080709",
        dateAdded: new Date(),
    },
});
product3.save();
