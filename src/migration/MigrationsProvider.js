const MigrationSet = require("./MigrationSet");
const glob = require("glob");
const util = require("util");

module.exports = class MigrationsProvider {

    constructor(directory) {
        this.directory = directory;
    }

    async load() {
        const files = await util.promisify(glob)(`/*.migration.js`, {
            root: this.directory,
            nomount: true,
            nodir: true
        });

        return new MigrationSet(
            files
                .map(file => ({
                    name: file.replace(/\.migration\.js/g, '').replace('/', ''),
                    migration: require(this.directory + file)
                }))
        );
    }
};

