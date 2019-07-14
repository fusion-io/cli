const {HttpRouter}  = require('@fusion.io/framework');
const Table         = require('cli-table3');
const chalk         = require('chalk');

exports.command     = 'routes';
exports.desc        = 'List the registered routes';

const print = (routes) => {
    const table = new Table({
        head: [chalk.cyan('method'), chalk.cyan('path'), chalk.cyan('name'), chalk.cyan('prefix')],
        colWidths: [10, 40, 40, 30]
    });

    routes.forEach(route => {
        table.push([
            chalk.green(route.methods.join(',')),
            chalk.gray(route.path),
            chalk.gray(route.opts.name),
            chalk.gray(route.opts.prefix)
        ])
    });

    return table;
};

exports.handler     = ({container}) => {

    const router = container.make(HttpRouter);

    console.log(print(router.stack.filter(layer => layer.opts.end)).toString());
};
