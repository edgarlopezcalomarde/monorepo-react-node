import { Controller, Post } from "@lib/Controller";
import { upload } from "@lib/MulterConfig";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

@Controller("/api/file")
export class FileController {
    constructor() { }

    @Post("/upload")
    async uploadFiles(req: Request, res: Response) {
        upload.array("files")(req, res, async (err) => {

            if (err) {
                return res.status(500).json({ message: 'Error interno del servidor.' });
            }

            if (!req.files) {
                return res.status(400).json({ message: 'No se subió ningún archivo.' });
            }

            const files = req.files as Express.Multer.File[];
            const data = files.map((file) => file.originalname);

            return res.status(200).json({ message: `Subida de archivo/s exitosa`, data });
        })
    }



    @Post("/image/upload")
    async uploadImages(req: Request, res: Response) {
        upload.any()(req, res, (err) => {


            if (err) {
                return res.status(500).json({ message: 'Error interno del servidor.' });
            }

            const images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];


            if (!images || images.length === 0) {
                return res.status(400).json({ message: 'No se subió ninguna imagen.' });
            }

            console.log(path.join('./uploads', `${Date.now()}.png`))
            console.log(+ "/dist/uploads")

            images.forEach((base64img: string) => {
                const buffer = Buffer.from(base64img.split(",")[1], "base64");
                // const uploadDir = path.join(process.cwd(), "/dist/uploads");
                fs.writeFileSync(path.join('./uploads', `${Date.now()}.png`), buffer);
                // fs.writeFileSync(path.join(uploadDir, `${Date.now()}.png`), buffer);
            });




            return res.status(200).json({ message: `Subida de imagen/es exitosa` });
        })

    }
}