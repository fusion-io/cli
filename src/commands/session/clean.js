const {SessionStorageManager} = require("@fusion.io/framework");
const chalk     = require('chalk');

exports.command     = 'clean';
exports.desc        = 'Cleanup the expired sessions';

exports.handler     = async ({container}) => {

    const sm = container.make(SessionStorageManager);
    await sm.adapter().cleanUp();

    console.log(chalk.green('Done'));

    process.exit(0);
};
