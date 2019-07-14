const {Storage} = require("@fusion.io/framework/Contracts");

exports.command     = 'dump <key>';
exports.desc        = 'Dump storage value';

exports.builder     = yargs => {
    yargs.positional('key', {
        description: "Storage key",
        type: "string"
    });

    yargs.option('t', {
        alias: 'tag',
        description: "Dump by tag instead of key"
    })
};

exports.handler = async ({container, storage, key, tag}) => {

    const sm     = container.make(Storage);
    const result = tag ? await sm.adapter(storage).getByTag(key) : await sm.adapter(storage).get(key);

    console.log(result);

    process.exit(0);
};
