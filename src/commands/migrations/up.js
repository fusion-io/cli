const {Database}             = require("@fusion.io/framework/Contracts");
const MigrationStateProvider = require("../../migration/MigrationStateProvider");
const MigrationsProvider     = require("./../../migration/MigrationsProvider");
const chalk                  = require('chalk');

exports.command = "up";
exports.desc    = "Run migrations";
exports.builder = yargs => {
    yargs.option("t", {
        alias: "to",
        desc: "Migrate to given version name",
        type: "string"
    });

    yargs.option("n", {
        alias: "number",
        desc: "Migrate up a number of versions",
        type: "number"
    });

    yargs.option("f", {
        alias: "force",
        desc: "Force run the migrations"
    });

    yargs.option("c", {
        alias: "connection",
        desc: "Specify the database connection",
        type: "string"
    });
};

exports.handler  = async ({container, connection, rc, number, to}) => {
    const dbm  = container.make(Database);
    const dbc  = dbm.connection(connection);

    const stateProvider     = new MigrationStateProvider(dbc).setTable(rc.migrations.table);
    const migrationProvider = new MigrationsProvider(process.cwd() + '/' + rc.migrations.directory);
    const set               = await migrationProvider.load();

    set.setState(await stateProvider.get());
    set.migrated(migration => {
        console.log(chalk.cyan(migration));
    });

    const notMigrated       = set.notMigrated();

    if (!notMigrated.length) {
        console.log(chalk.gray('Nothing to migrate'));
        process.exit(0);
    }

    let provisioned = [];

    // Start the database transaction

    if (number) {
        provisioned = await set.up(number, dbc);
    } else if (to) {
        provisioned = await set.upTo(to, dbc);
    } else {
        provisioned = await set.latest(dbc);
    }

    await stateProvider.sync(provisioned);

    process.exit(0);
};