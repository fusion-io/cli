exports.command     = 'storage';
exports.desc        = 'Storage commands';
exports.builder     = (yargs) => {
    yargs.commandDir(__dirname + '/storage');
    yargs.option('s', {
        alias: 'storage',
        description: "The storage name",
        type: "string"
    })
};

exports.handler     = () => { };
