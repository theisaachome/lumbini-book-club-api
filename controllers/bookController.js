const  asyncHandler=require('express-async-handler');

const getAllBooks= asyncHandler(async(req,res,next)=>{
    res.status(200).json({msg:"Get All books"});
});
const getBook =asyncHandler(async(req,res,next)=>{
    res.status(200).json({
        msg:`Get Book ${req.id}`
    })
});
const createBook = asyncHandler(async(req,res,next)=>{
    res.status(201).json({
        msg:"Create new Book"
    })
})
const updateBook = asyncHandler(async(req,res,next)=>{
    res.status(200).json({msg:`Update book ${req.id}`});
});
const deleteBook = asyncHandler(async(req,res,next)=>{
    res.status(200).json({msg:`delete Book with id ${req.id}`})
})

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
}