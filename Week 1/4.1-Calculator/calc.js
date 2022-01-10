const yargs = require("yargs");

const args = process.argv.slice(2);

// add command
yargs.command({
    command: "add",
    describe: "Add 2 numbers",
    handler: function () {
        console.log(+args[1] + +args[2]);
    },
});

// subtract command
yargs.command({
    command: "sub",
    describe: "Subtract 2 numbers",
    handler: function () {
        console.log(+args[1] - +args[2]);
    },
});

// multiply command
yargs.command({
    command: "mult",
    describe: "Multiply 2 numbers",
    handler: function () {
        console.log(+args[1] * +args[2]);
    },
});

// power command
yargs.command({
    command: "pow",
    describe: "Power a number to 2",
    handler: function () {
        console.log(+args[1] * +args[1]);
    },
});

yargs.parse();
