#!/usr/bin/env node

import * as commander from "commander";
import {Application} from "..";

async function main() {
    commander.version('0.1.1')
        .description('start running validator server')
        .option('-d, --development',
            '(default env setting) similar to set NODE_ENV=development, and will read login.development.json at executing position as config by default',
            () => process.env.NODE_ENV = 'development')
        .option('-p, --production',
            'similar to set NODE_ENV=production, and will read login.production.json at executing position as config by default',
            () => process.env.NODE_ENV = 'production')
        .option('-P, --port <port>',
            'the port to serve api, 11601 by default')
        .action((options) => {
            const port = (options && options.port) || 11601;
            const api = new Application();
            api.start(port);
        });

    commander.parse(process.argv);
}

main().then(() => {
    // console.info('running eosSignValidator succeeded.');
}).catch((reason => {
    console.error(reason + '\nrunning eosSignValidator failed.');
    process.exit(1);
}));

