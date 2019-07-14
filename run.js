const fs            = require('fs');
const yargs         = require('yargs');
const findUp        = require('find-up');
const rcPath        = findUp.sync(['.fusionrc', '.fusionrc.json']);
const rc            = rcPath ? JSON.parse(fs.readFileSync(rcPath)) : {};
const chalk         = require('chalk');

const bootFusion = async (argv) => {
    if (!argv.container) {
        const EventEmitter  = require('events').EventEmitter;
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
            if (!rcPath) {
                console.error(chalk.gray(`It seems you are not in a fusion application root directory`));
                process.exit(0);
            }

            require('app-module-path').addPath(process.cwd() + '/node_modules');

            require('@babel/register')({
                    "plugins": [
                        ["@babel/plugin-proposal-decorators", {"legacy": true}],
                        "babel-plugin-dynamic-import-node"
                    ],
                    "presets": [
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "node": "8"
                                }
                            }
                        ]
                    ]
                }
            );



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
