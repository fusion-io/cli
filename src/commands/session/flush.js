const {SessionStorageManager} = require("@fusion.io/framework");
const chalk     = require("chalk");

exports.command     = 'flush';
exports.desc        = 'Flush session data';
exports.handler     = async ({container}) => {

    const sm = container.make(SessionStorageManager);
    await sm.adapter().flush();

    console.log(chalk.green('Done'));
    process.exit(0);
};
