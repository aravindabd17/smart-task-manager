const Multer=require("multer");

const allowedTypes=['image/jpeg','image/png','image/webp','application/pdf'];
const fileStorage=Multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const fileFilter=(req,file,cb)=>{
    if(allowedTypes.includes(file.mimetype))
        cb(null,true);
    else 
        cb(new Error('File type is not supported. Allowed type jpg,png and pdf'),false);
};
const upload=Multer({
    storage:fileStorage,
    fileFilter,
    limits:{fileSize: 2 *1024 *1024}
});
module.exports=upload;