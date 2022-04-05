const express = require("express");
const { uploadBooksCSVFile } = require("../controllers/fileuploadController");
const uploadCsv = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/",(req,res,next)=>{
    res.send("file upload routes");
});


router.post("/books",uploadCsv.single("file"),uploadBooksCSVFile);
module.exports = router;