exports.command     = 'migrations';
exports.desc        = 'Migration commands';
exports.builder     = (yargs) => {
    yargs.commandDir(__dirname + '/migrations');
};

exports.handler = () => {};
