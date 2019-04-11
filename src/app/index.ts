#!/usr/bin/env node

import * as commander from "commander";
import {Application} from "..";
import * as Path from "path";
import {Global} from "../global";
import * as fs from "fs-extra";

async function main() {
    commander.version('0.1.5')
        .description('start running validator server')
        .option('-d, --development',
            '(default env setting) similar to set NODE_ENV=development, and will read eos_sign_validator.development.json at executing position as config by default',
            () => process.env.NODE_ENV = 'development')
        .option('-p, --production',
            'similar to set NODE_ENV=production, and will read eos_sign_validator.production.json at executing position as config by default',
            () => process.env.NODE_ENV = 'production')
        .option('-c, --config <path>',
            'set config path, and the specified conf will override the default one set by NODE_ENV',
            path => Global.setConf(path, true))
        .option('-P, --port <port>',
            'the port to serve api', 11601)
        .option('-e, --extract <filename>',
            'extract default config to a file, ex. ./eos_sign_validator.development.json',
            filename => {
            console.log("extract", filename)
                let extractPath = filename;
                extractPath = Path.isAbsolute(extractPath) ? extractPath : Path.resolve(process.cwd(), extractPath);
                fs.copyFileSync(Path.resolve(__dirname, `../conf.default.json`), extractPath);
                process.exit(0);
            })
        .action((options) => {
            try {
                Global.setConf(Path.resolve(process.cwd(), `./eos_sign_validator.${process.env.NODE_ENV || "development"}.json`), false);
            } catch (e) {
                Global.setConf(Path.resolve(__dirname, `../conf.default.json`), false);
            }

            const port = (options && options.port) || 11601;
            console.log("config path :", Global.confPath);
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

