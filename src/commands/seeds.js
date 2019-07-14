exports.command     = "seeds";
exports.desc        = "Seeding commands";
exports.builder     = yargs => {
    yargs.commandDir(__dirname + '/seeds')
};

exports.handler     = ({container}) => {

};
