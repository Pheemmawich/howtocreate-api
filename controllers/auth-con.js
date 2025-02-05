exports.register = (req,res,next)=>{
    try{
        res.json({message:"hello register"})
    }catch(error){
       next(error)
    }

}

exports.login = (req,res,next)=>{
    try {
        console.log(dfsdfsdfijjo)
        res.json({message:"hello login"})
    } catch (error) {
        next(error)
    }    
}