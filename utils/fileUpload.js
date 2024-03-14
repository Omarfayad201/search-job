import multer,{diskStorage} from "multer"

export const fileValidation = {
    files:["application/pdf"]
}

export function fileUpload() {
    const storage = diskStorage({});// save file in system "temp"

    const multerUpload = multer({ storage });
    
    return multerUpload

}