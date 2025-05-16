import multer from "multer";
import path from "path";
import crypto from "crypto";

const uploadFodler = path.resolve(__dirname, "..", "..", "uploads")

export default {
    directory: uploadFodler,
    storage: multer.diskStorage({
        destination: uploadFodler,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const filename = `${fileHash}-${file.originalname}`
            callback(null, filename)
        }
    })
}