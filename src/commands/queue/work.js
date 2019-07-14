const {QueueWorker} = require("@fusion.io/framework");
const {Queue}       = require("@fusion.io/framework/Contracts");
const chalk         = require("chalk");


exports.command = "work [queue]";

exports.builder = (yargs) => {

    yargs.positional("queue", {
        describe: "Queue name",
        default: null
    });

    yargs.option("retry", {
        alias: "r",
        describe: "Set retry time",
        default: 1
    });
    
    yargs.option("timeout", {
        alias: "t",
        describe: "Set timeout for a job execution (ms)",
        default: 5000
    });

    yargs.option("delay", {
        alias: "d",
        describe: "Delay before job execution (ms)",
        default: 0
    })
};

exports.handler = ({container, queue, retry, timeout, delay}) => {

    const worker = container.make(QueueWorker, retry, timeout, delay);
    const qm     = container.make(Queue);

    console.log(chalk.gray(`Worker now listening for queue [${chalk.cyan(queue)}]`));

    qm.queue(queue).pull(async (job) => {
        console.log(`%s %s`, chalk.cyan(job.jobName), chalk.gray(JSON.stringify(job.payload)));
        await worker.work(job);
    });
};
