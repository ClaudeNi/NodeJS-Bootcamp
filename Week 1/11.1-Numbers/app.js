const express = require("express");
const app = express();

const arr = [1, 2, 3, 4, 5, 6];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("numbers lets go");
});

app.get("/numbers", (req, res) => {
    res.send(arr);
});

app.post("/numbers", (req, res) => {
    const num = parseInt(req.body.num);
    const index = arr.indexOf(num);
    if (index === -1) {
        arr.push(num);
        res.send(arr);
    } else {
        res.status(400).send(`${num} is already in the array`);
    }
});

app.delete("/numbers", (req, res) => {
    const num = parseInt(req.body.num);
    const index = arr.indexOf(num);
    if (index === -1) {
        res.status(400).send(`${num} does not exist in the array to delete`);
    } else {
        arr.splice(index, 1);
        res.send(arr);
    }
});

app.put("/numbers", (req, res) => {
    const num = parseInt(req.body.num);
    const replace = parseInt(req.body.replace);
    const index = arr.indexOf(replace);
    if (index === -1) {
        res.status(400).send(
            `${replace} does not exist in the array to update`
        );
    } else {
        arr[index] = num;
        res.send(arr);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listentinig to port: ${PORT}`);
});
