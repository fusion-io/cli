exports.command     = 'config';
exports.desc        = 'Config commands';
exports.builder     = (yargs) => {
    yargs.commandDir(__dirname + '/config');
};

exports.handler     = () => { };
