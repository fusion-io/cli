const EventEmitter  = require('events').EventEmitter;
const findUp        = require('find-up');
const fs            = require('fs');
const rcPath        = findUp.sync(['.fusionrc', '.fuionrc.json']);

const rc            = rcPath ? JSON.parse(fs.readFileSync(rcPath)) : {};

const bootstrap     = require(process.cwd() + '/' + rc['bootstrap']);
const yargs         = require('yargs');
const event         = new EventEmitter();


module.exports = yargs
    .commandDir(__dirname + '/src/commands')
    .demandCommand()
    .middleware(async argv => {
        const container = await bootstrap.default(event);

        return {
            ...argv,
            rc,
            // Load the container as an arg
            container
        }
    })
.help()
.argv
;
