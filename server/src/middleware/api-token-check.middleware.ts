import { BadRequestException, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken'
import { UserService } from "src/auth/auth.service";
import { JwtPayload } from 'jsonwebtoken';

export class ApiTokenCheckMiddleware implements NestMiddleware{
    constructor(private jwtService: JwtService, private userService: UserService) { }

    async use(req: Request, res:Response, next:NextFunction){
        const authHeader = req.headers['authorization']
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new UnauthorizedException('Invalid token') 
        }
        const token = req.headers['authorization'].split(' ')[1]
        try{
            const payload = jwt.verify(token, "jwtSecret") as JwtPayload
            req['user'] = { userId: payload.userId, email: payload.email }
            next()
        }
        catch(error){
            throw new UnauthorizedException('Could not verify token')
        }
    }
}