import * as jwt from 'jsonwebtoken'
import { Request,Response } from 'express';

/* Récupération du header bearer */
export const extractBearerToken = (headerValue:any) => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    
    return matches && matches[2]
}


/* Vérification du token */
export const checkTokenMiddleware = (req:Request, res:Response, next:any):any => {

    //Verifier la route 
    if(req.path == "/login" || req.path == "/register" || req.method == "GET" || (req.path == "/users" && req.method == "POST")){
        return next()
    }

    // Récupération du token
    const token:string|boolean = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Autorisation refusée.' })
    }

    // Véracité du token
    jwt.verify(token, process.env.SECRET, (err:any, decodedToken:any) => {
        if (err) {
            res.status(401).json({ message: 'Autorisation refusée.' })
        } else {
            return next()
        }
    })
}


export const createToken = (user:any)=>{
    const token = jwt.sign({
        user: user,
    }, process.env.SECRET)
    return token
}

export const decodedToken = (token:string)=>{
    var decoded = jwt.verify(token, process.env.SECRET);
    if(decoded){
        return true
    }else{
        return false
    }
}