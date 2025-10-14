/*
Hight order function 
const asyncHandler = () => {}
const asyncHandler = (fn) => {
    //another function
    ()=> {}
}
const asyncHandler = (fn) => async() => {}
    **/
/* 
## using try catch ##

const asyncHandler = (fn) => async(req,res,next) => {
    try{
        await fn(req, res, next)
    }
    catch(error) {
        res.status(error.code || 500).json({
            success : false,
            message: error.message
        })
        console.log(error)
    }
} **/
//  ## Using Promises ##
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.sucess(requestHandler(req, res, next)).catch(err > next(err));
  };
};
export { asyncHandler };
