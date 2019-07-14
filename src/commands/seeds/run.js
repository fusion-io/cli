exports.command     = "run <seeder>";
exports.desc        = "Run a seeder";
exports.builder     = yargs => {
    yargs.positional("seeder", {
        description: "Seeder name",
        type: "string"
    });
};

exports.handler = async ({container, seeder, rc}) => {

    const Seeder = require(
        process.cwd() + '/' + rc.seeders.directory + '/' + seeder + 'Seeder.seeder.js'
    ).default;

    await new Seeder().seed();

    process.exit(0);
};
