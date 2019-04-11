import * as Router from 'koa-router'
import * as Koa from "koa";
import * as methods from "./methods"
import {Global} from "./global";

const router = new Router();


export const useRouters = (app: Koa): Koa => {

    Object.keys(methods)
        .forEach(name => {
            const method: any = (methods as any)[name];
            const dealer : Koa.Middleware = async (ctx, next) => {
                const data = await Promise.resolve(method(ctx.request.body));
                ctx.status = 200;
                ctx.response.body = {
                    statusCode: 200,
                    result: !!data,
                    data
                };
                return await next();
            };
            router.post("/" + name, dealer);
        });

    router.get("/info", async (ctx, next) => {
        ctx.status = 200;
        ctx.response.body = {
            version: Global.version,
            conf: Global.conf,
            confPath: Global.confPath
        };
        return await next();
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
};
