import { registerController } from "./ControllerRegistry";
import { RequestHandler } from "express";
import "reflect-metadata";

export function Controller(basePath: string) {
    return function (target: any) {
        Reflect.defineMetadata('basePath', basePath, target);
        registerController(target);
    }
}

function createRouteDecorator(method: string) {
    return function (path: string, middlewares: RequestHandler[] = []) {
        return function (target: any, propertyKey: string) {
            const routes = Reflect.getMetadata('routes', target.constructor) || [];
            routes.push({ method, path, handler: propertyKey, middlewares });
            Reflect.defineMetadata('routes', routes, target.constructor);
        }
    }
}

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Patch = createRouteDecorator('patch');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
