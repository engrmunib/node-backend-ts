import { BaseController } from "./common/base.controller";

export class Registry {
    
    controllers: any = {}
    
    constructor() {
        this.controllers = {}
    }

    registerController(slug: string, ctrlClass: any) {
        this.controllers[slug] = ctrlClass;
    }

    getController(slug: string) {
        if (slug in this.controllers) {
            return this.controllers[slug];
        }
        return null;
    }

}

export default new Registry();
