const {ViewEngineNunjucks} = require("@fusion.io/framework");

const fs = require('fs');

exports.command     = "create <seeder>";
exports.desc        = "Create a database seeder";
exports.builder     = yargs => {
    yargs.positional("seeder", {
        description: "Seeder name"
    });
};

exports.handler     = ({container, seeder, rc}) => {
    const templateString = fs.readFileSync(__dirname + '/template/seeder.js.template').toString();
    const viewEngine     = container.make(ViewEngineNunjucks).getEnv();
    const className      = seeder + "Seeder";
    const seederCode     = viewEngine.renderString(templateString, {className});

    fs.writeFileSync(rc.seeders.directory + '/' + className + '.seeder.js', seederCode);
};
