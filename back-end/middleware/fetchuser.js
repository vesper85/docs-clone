import JWT from 'jsonwebtoken'

const fetchuser = (req,res,next)=>{
    const JWTtoken = req.header('auth-token');
    if(!JWTtoken){
        return res.status(401).send('please authenticate using a propers token (token not found)')
    }
    try {
        const key = process.env.JWTSECRETKEY

        const data = JWT.verify(JWTtoken,key)
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid Authentication (invalid JWT Token)')
    }
}

export default fetchuser;