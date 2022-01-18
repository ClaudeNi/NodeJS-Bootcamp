const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "blog";

const users = [
    {
        name: "bobby",
        email: "bob@gmail.com",
    },
    {
        name: "port",
        email: "port@gmail.com",
    },
    {
        name: "bob",
        email: "bob@gmail.com",
    },
    {
        name: "karto",
        email: "karto@gmail.com",
    },
];

const posts = [
    {
        title: "That time I was kidnapped by aliens and lived among them as a citizen.",
        text: "So I was kidnapped",
        tags: ["Action", "Drama"],
        owner: ObjectId("61e6ab6885d26bc88e998fac"),
        comments: [
            {
                text: "awesome post man",
                owner: ObjectId("61e6ab6885d26bc88e998fad"),
            },
            {
                text: "Thank you",
                owner: ObjectId("61e6ab6885d26bc88e998fac"),
            },
        ],
    },
    {
        title: "How I created the next nano technology.",
        text: "Yes I am its creator",
        tags: ["Adventure", "Science"],
        owner: ObjectId("61e6ab6885d26bc88e998fad"),
        comments: [
            {
                text: "awesome post man",
                owner: ObjectId("61e6ab6885d26bc88e998fac"),
            },
            {
                text: "Thank you",
                owner: ObjectId("61e6ab6885d26bc88e998fad"),
            },
        ],
    },
];

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("unable to connect to database");
        }

        const insertItem = async (item, collection, check) => {
            db.collection(collection).findOne(
                { [check]: item[check] },
                async (error, response) => {
                    if (error) {
                        console.log(`unable to fetch ${check}`);
                    }

                    if (!response) {
                        await db.collection(collection).insertOne(item);
                        console.log(`${check} added`);
                    } else {
                        console.log(`${check} already exists`);
                    }
                }
            );
        };

        const db = client.db(databaseName);
        db.collection("users").createIndex({ email: 1 }, { unique: true });

        insertItem(users[0], "users", "email");
        insertItem(users[1], "users", "email");
        insertItem(users[2], "users", "email");
        insertItem(users[3], "users", "email");

        insertItem(posts[0], "posts", "text");
        insertItem(posts[1], "posts", "text");
    }
);
