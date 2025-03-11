import { Request,Response,NextFunction } from "express";
import { payloadType } from "../types/payloadType";
import { verify } from "jsonwebtoken";

export async function verifyToken(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
      }
      try {
        const [_, tokenCorrect] = token.split(' ');
        const { id } = verify(tokenCorrect, process.env.TOKEN_KEY as string) as payloadType;
        req.ID=id
        
        next();
      } catch (error) {
          return res.status(401).json({message:error});
      }
    
     
}

