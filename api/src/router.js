const {Router, request} = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'api/uploads',
    filename: filename
});

const upload = multer({
    fileFilter,
    storage
});

const router = Router();


function fileFilter(request,file,callback) {
    if(file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null,false,new Error('Wrong file type'));
    } else {
        callback(null,true);
    }
}

function filename(request,file,callback) {
    callback(null,file.originalname);
}


router.post('/upload', upload.single('photo'),(req,res) => {
    if(req.fileValidationError){
        res.status(400).json({error: req.fileValidationError});
    }
    res.status(201).json({success:true});
})

module.exports = router;