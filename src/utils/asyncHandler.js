

const asyncHandler = (fn) =>async (req, res, next) =>
{
    try{
      await  fn(req,res,next);
    }
    catch(error){
        res.status(500).json({message:"internal server error"});
        console.log("error while processing request",error);
    }
}
export default asyncHandler;
