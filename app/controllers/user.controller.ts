import md5 from "md5"

import { User } from '../models/user.model'
import { BaseController } from '../common/base.controller';


export class UserController extends BaseController {
    
    constructor() {
        super()
        this.model = User;
    }

    async single() {
        const data = await super.single();
        data.password = '<<<encrypted>>>';
        return data;
    }

    async create() {
        const data = this.context?.body;
        data.password = md5(data.password);
        return await super.create_record(data);
    }

    async update() {
        const data = this.context?.body;
        if (data.password !== '<<<encrypted>>>') {
            data.password = md5(data.password);
        }
        else {
            delete data.password;
        }
        return await super.update_record(data);
    }

    async delete() {
        const id = this.context?.body.id;
        return await super.delete_record(id);
    }
}
