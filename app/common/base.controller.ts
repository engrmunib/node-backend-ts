import { Request } from "express";
import { Transaction } from "sequelize";
import { Errors } from "../utils/errors";
import { currentTime } from "../utils/functions";


export class BaseController {
    
    transaction?: Transaction;
    model?: any | null;
    context?: Request;
    publicMethods: string[];

    constructor() {
        this.publicMethods = ['single', 'all', 'create', 'update', 'delete'];
    }

    async single() {
        const id = this.context?.query.id;
        const doc = await this.get_record(id);
        if (doc === null) {
            throw new Error(Errors.RecordNotFound);
        }
        return doc;
    }

    async all() {
        const records = await this.model.findAll();
        return records;
    }

    async create() {
        const data = this.context?.body;
        return await this.create_record(data);
    }

    async update() {
        const data = this.context?.body;
        return await this.update_record(data);
    }

    async delete() {
        const id = this.context?.body.id;
        return await this.delete_record(id);
    }

    async get_record(id: any) {
        const doc = await this.model.findByPk(id);
        return doc;
    }

    async create_record(data: any) {
        const rec: any = {};
        for (const k in data) {
            if (k === this.model.primaryKeyAttribute){
                continue;
            }
            let v = data[k];
            if ((typeof v === 'string' || v instanceof String) && v === null) {
                v = null;
            }
            rec[k] = data[k];
        }

        rec.date_added = currentTime();
        rec.date_updated = currentTime();
        const doc = await this.model.create(rec, {
            transaction: this.transaction
        });
        return doc[this.model.primaryKeyAttribute];
    }

    async update_record(data: any) {
        const rec: any = {};
        for (const k in data) {
            if (k === this.model.primaryKeyAttribute){
                continue;
            }
            let v = data[k];
            if ((typeof v === 'string' || v instanceof String) && v === null) {
                v = null;
            }
            rec[k] = data[k];
        }

        const id = this.context?.body[this.model.primaryKeyAttribute];

        const d = await this.model.findByPk(id);
        if (d === null) {
            throw new Error('Record not found!');
        }
        
        rec.date_updated = currentTime();
        const doc = await this.model.update(rec, {
            transaction: this.transaction,
            where: {
                [this.model.primaryKeyAttribute]: id
            },
        });
        return id;
    }

    async delete_record(id: any) {

        const d = await this.model.findByPk(id);
        if (d === null) {
            throw new Error('Record not found!');
        }

        const doc = await d.destroy();

        // const doc = await this.model.destroy({
        //     transaction: this.transaction,
        //     where: {
        //         [this.model.primaryKeyAttribute]: id
        //     },
        // });

        return null;
    }
}
