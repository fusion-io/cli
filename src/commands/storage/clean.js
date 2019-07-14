const {Storage} = require("@fusion.io/framework/Contracts");
const chalk     = require('chalk');

exports.command     = 'clean';
exports.desc        = 'Cleanup the expired storage items';

exports.handler     = async ({container, storage}) => {

    const sm = container.make(Storage);
    await sm.adapter(storage).cleanUp();

    console.log(chalk.green('Done'));

    process.exit(0);
};
