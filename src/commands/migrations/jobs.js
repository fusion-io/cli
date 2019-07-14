const {ViewEngineNunjucks} = require("@fusion.io/framework");

const fs     = require("fs");
const moment = require("moment");
const lodash = require("lodash");

exports.command     = "jobs [table]";
exports.desc        = "Create a migration for making jobs table";
exports.builder     = yargs => {
    yargs.positional("table", {
        describe: "Table name",
        default: "fusion_jobs",
        type: "string"
    });
};

exports.handler = ({rc, table, container}) => {

    const viewEngine = container.make(ViewEngineNunjucks);
    const className  = "Create" + lodash.upperFirst(lodash.camelCase(table)) + "TableMigration";
    const migration  = "create_" + table + "_table";

    const templateString = fs.readFileSync(__dirname + '/templates/jobs.js.template').toString();
    const fileName       = moment().format("YYYYMMDD_HHmmss") + "_" + migration + ".migration.js";
    const migrationCode  = viewEngine.getEnv().renderString(templateString, {tableName: table, className});

    fs.writeFileSync(rc.migrations.directory + "/" + fileName, migrationCode);
};