import * as Router from 'koa-router'
import * as Koa from "koa";
import * as methods from "./methods"

const objectToArray = (dict: any): any[] => Object.keys(dict).map((name) => dict[name]);

const router = new Router();

Object.keys(methods).forEach(name => {
        router.post("/" + name, async (ctx, next)=>{
            const method : any = (methods as any)[name];
            const data = await Promise.resolve(method(ctx.request.body));
            ctx.status = 200
            ctx.response.body = {
                statusCode: 200,
                result: !! data,
                data
            };
            return await next();
        })
        console.log("create api /", name)
    }
);

export const useRouters = (app: Koa): Koa => {
    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
};