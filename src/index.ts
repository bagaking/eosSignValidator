import * as Koa from "koa";

import { createServer, Server } from "http";
import {useMiddlewares} from "./middlewares";
import {useRouters} from "./router";

const objectToArray = (dict: any): any[] => Object.keys(dict).map((name) => dict[name]);

export class Application {
    public koa: Koa;
    private server: Server;

    constructor() {
        this.koa = new Koa();
        this.server = createServer(this.koa.callback());
    }

    private init() {
        this.koa.use(async (ctx: Koa.Context, next: Function) => {
            try {
                await next();
            } catch (error) {
                ctx.status = 200;
                const msgCode = Number(error.message || error);

                ctx.body = {
                    statusCode: error.statusCode || 500,
                    message: isNaN(msgCode) ? (error.message || error) : msgCode,
                };
            }
        });

        useMiddlewares(this.koa, process.env.NODE_ENV || "development");
        useRouters(this.koa);
    }

    public start(port: number) {
        this.init();
        return this.koa.listen(port, (): void => {
            console.log(`Koa server has started, running at: http://127.0.0.1:${port}. `);
        });
    }
}
