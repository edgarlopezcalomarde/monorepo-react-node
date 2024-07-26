import { Request, Response } from "express";
import { GetAllProducts } from './GetAllProducts';


export class ProductController {
    constructor(private getAllProducts: GetAllProducts) { }

    getAll = (req: Request, res: Response) => {
        console.log("Holaaaa reiniciado1 55 ");

        // console.log("Holaaaa reiniciado 2");
        res.json({
            data: this.getAllProducts.execute()
        })
    }
}