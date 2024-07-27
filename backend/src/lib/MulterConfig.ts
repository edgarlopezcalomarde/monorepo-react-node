import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },

})

export const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }) //LIMITADO A 5MB




