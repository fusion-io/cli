const {Config}      = require('@fusion.io/framework/Contracts');
const {HttpKernel}  = require('@fusion.io/framework');

exports.command     = 'start';
exports.desc        = 'Start the web server';

exports.handler     = ({container}) => {

    const kernel = container.make(HttpKernel);
    const config = container.make(Config);
    const port   = config.get('http.port');

    kernel.listen(port, () => {
        console.log("Server started at port %s", port);
    });
};
