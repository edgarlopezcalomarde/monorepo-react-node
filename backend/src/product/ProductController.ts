import { Request, Response } from "express";
import { GetAllProducts } from './GetAllProducts';


export class ProductController {
    constructor(private getAllProducts: GetAllProducts) { }

    getAll = (req: Request, res: Response) => {
        res.json({
            data: this.getAllProducts.execute()
        })
    }
}