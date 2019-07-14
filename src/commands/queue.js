exports.command = "queue";
exports.desc    = "Queue commands";
exports.builder = (yargs) => {
    yargs.commandDir(__dirname + '/queue');
};
