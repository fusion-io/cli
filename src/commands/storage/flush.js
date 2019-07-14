const {Storage} = require("@fusion.io/framework/Contracts");
const chalk     = require("chalk");

exports.command     = 'flush';
exports.desc        = 'Flush storage data';
exports.handler     = async ({container, storage}) => {

    const sm = container.make(Storage);
    await sm.adapter(storage).flush();

    console.log(chalk.green('Done'));
    process.exit(0);
};
