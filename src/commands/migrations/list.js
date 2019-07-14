const MigrationStateProvider = require("../../migration/MigrationStateProvider");
const MigrationsProvider     = require("./../../migration/MigrationsProvider");
const {Database}             = require("@fusion.io/framework/Contracts");
const Table                  = require("cli-table3");
const chalk                  = require('chalk');


exports.command = "list";
exports.desc    = "Listing the migrations";
exports.builder = yargs => {


    yargs.option("c", {
        alias: "connection",
        desc: "Specify the database connection",
        type: "string",
        default: null
    });
};

const print = (set) => {
    let table = new Table({
        head: ['', chalk.cyan('Name'), chalk.cyan('Run at')]
        , colWidths: [3, 40, 30]
    });

    set.defines().forEach(({name}) => {

        const execution  = set.getExecution(name);
        const statusIcon = execution ? chalk.green('√') : '';


        table.push([
            statusIcon,
            execution ? chalk.gray(name) : name,
            execution ? chalk.gray(new Date(execution.runAt).toISOString()): ''
        ]);
    });

    return table;
};


exports.handler  = async ({container, connection, rc}) => {

    const dbm  = container.make(Database);
    const dbc  = dbm.connection(connection);

    const stateProvider     = new MigrationStateProvider(dbc).setTable(rc.migrations.table);
    const migrationProvider = new MigrationsProvider(process.cwd() + '/' + rc.migrations.directory);

    const set = await migrationProvider.load();

    set.setState(await stateProvider.get());

    console.log(print(set).toString());

    process.exit(0);
};


