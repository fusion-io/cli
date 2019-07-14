const yargs         = require('yargs');
const EventEmitter  = require('events').EventEmitter;
const findUp        = require('find-up');
const fs            = require('fs');
const rcPath        = findUp.sync(['.fusionrc', '.fuionrc.json']);
const rc            = rcPath ? JSON.parse(fs.readFileSync(rcPath)) : {};

const bootFusion = async (argv) => {
    if (!argv.container) {

        const bootstrap     = require(process.cwd() + '/' + rc['bootstrap']);
        const event         = new EventEmitter();

        const container = await bootstrap.default(event);

        return {
            ...argv,
            container
        }
    }

    return argv;
};

module.exports = yargs
    .command(require('./newFusion'))
    .command({
        command: '$0',
        builder: yargs => {
            yargs
                .commandDir(__dirname + '/src/commands')
                .commandDir(process.cwd() + '/' + rc.commands)
                .middleware(bootFusion)
        },
        handler: () => {}
    })
    .middleware(async argv => {
        if (!argv.rc) {
            return {
                ...argv,
                rc
            }
        }
        return argv;
    })
.help()
.argv
;
