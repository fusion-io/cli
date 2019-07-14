const {Config} = require("@fusion.io/framework/Contracts");

exports.desc = "Dumps the configuration values";

exports.command = "dump [key]";

exports.builder = yargs => {
    yargs.positional('key', {
        description: "Config key",
        default: null
    });
};

exports.handler = ({container, key}) => {
    const config = container.make(Config);

    console.log(key === null ? config.hashed : config.get(key));
};
