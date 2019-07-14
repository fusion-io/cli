exports.command = ['new <application>', 'create <application>'];
exports.description = 'Create a new Fusion application';
exports.handler = () => {
    console.log('Tada');
};

exports.builder = yargs => {

    yargs.positional('application', {
        description: 'Application name. A valid npm package name is required',
    });
};
