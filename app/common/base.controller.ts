import { Request } from "express";
import { Transaction } from "sequelize";


export class BaseController {
    
    transaction?: Transaction;
    model?: any | null;
    context?: Request;
    publicMethods: string[];

    constructor() {
        this.publicMethods = [];
    }

    async single() {
        const id = this.context?.query.id;
        const doc = await this.model.findByPk(id);
        if (doc === null) {
            throw new Error('Record not found!');
        }
        return doc;
    }

    async all() {
        const records = await this.model.findAll();
        return records;
    }

    async create() {
        const data = this.context?.body;
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

        const doc = await this.model.create(rec, {
            transaction: this.transaction
        });
        return doc[this.model.primaryKeyAttribute];
    }

    async update() {
        const data = this.context?.body;
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
        
        const doc = await this.model.update(rec, {
            transaction: this.transaction,
            where: {
                [this.model.primaryKeyAttribute]: id
            },
        });
        return doc[this.model.primaryKeyAttribute];
    }

    async delete() {
        const id = this.context?.body.id;

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
