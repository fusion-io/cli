exports.command     = 'session';
exports.desc        = 'Session commands';
exports.builder     = (yargs) => {
    yargs.commandDir(__dirname + '/session');
};

exports.handler     = () => { };
