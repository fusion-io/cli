const fs = require('fs');

exports.command = ['new <application>', 'create <application>'];
exports.description = 'Create a new Fusion application';
exports.handler = () => {

};

exports.builder = yargs => {

    yargs.positional('application', {
        description: 'Application name. A valid npm package name is required',
    });
};
