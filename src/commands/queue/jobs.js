const {QueueRegistry}   = require("@fusion.io/framework");
const chalk             = require("chalk");
const Table             = require('cli-table3');

const print = (registry) => {
    const table = new Table({
        head: [chalk.cyan('#'), chalk.cyan('job')],
        colWidths: [7, 30]
    });

    let i = 0;

    registry.forEach((execution, job) => {
        table.push([++i, job]);
    });

    return table;
};

exports.command = "jobs";
exports.desc    = "List registered jobs";

exports.handler = ({container}) => {

    const registry = container.make(QueueRegistry);

    console.log(print(registry).toString());
};
