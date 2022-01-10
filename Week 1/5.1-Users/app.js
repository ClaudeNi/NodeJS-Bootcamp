const yargs = require("yargs");
const users = require("./users");

yargs.command({
    command: "create",
    describe: "Create new user",
    builder: {
        name: {
            describe: "user name",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "user email",
            demandOption: true,
            type: "string",
        },
    },
    handler: function (argv) {
        users.create(argv.name, argv.email);
    },
});

yargs.command({
    command: "read",
    describe: "read user",
    builder: {
        id: {
            describe: "user id",
            demandOption: true,
            type: "string",
        },
    },
    handler: function (argv) {
        users.read(argv.id);
    },
});

yargs.command({
    command: "update",
    describe: "update user",
    builder: {
        id: {
            describe: "user id",
            demandOption: true,
            type: "string",
        },
        name: {
            describe: "user name",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "user email",
            demandOption: true,
            type: "string",
        },
    },
    handler: function (argv) {
        users.update(argv.id, argv.name, argv.email);
    },
});

yargs.command({
    command: "delete",
    describe: "delete user",
    builder: {
        id: {
            describe: "user id",
            demandOption: true,
            type: "string",
        },
    },
    handler: function (argv) {
        users.delete(argv.id);
    },
});

yargs.parse();
