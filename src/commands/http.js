exports.command     = 'http';
exports.desc        = 'Http commands';
exports.builder     = (yargs) => {
    yargs.commandDir(__dirname + '/http');
};

exports.handler     = () => {};
