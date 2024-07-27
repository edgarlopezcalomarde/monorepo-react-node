import { Router, RequestHandler } from "express";

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface Route {
    method: HttpMethod;
    path: string;
    handler: string;
    middlewares?: RequestHandler[];
}

interface ControllerEntry {
    controller: any;
    instance: any;
}

const controllers: ControllerEntry[] = [];

export function registerController(controller: any) {
    const instance = new controller();
    controllers.push({ controller, instance });
}

export function registerControllers(controllers: any[]) {
    controllers.forEach(controller => {
        registerController(controller);
    });
}

export function initializeControllers(appRouter: Router, defaultPath: string = '') {
    controllers.forEach(({ controller, instance }) => {
        const basePath: string = Reflect.getMetadata('basePath', controller) || '';
        const routes: Route[] = Reflect.getMetadata('routes', controller) || [];

        routes.forEach(route => {
            const handler = instance[route.handler].bind(instance);
            const fullPath = defaultPath + basePath + route.path;
            if (route.middlewares && route.middlewares.length > 0) {
                appRouter[route.method](fullPath, ...route.middlewares, handler);
            } else {
                appRouter[route.method](fullPath, handler);
            }
        });
    });
}
